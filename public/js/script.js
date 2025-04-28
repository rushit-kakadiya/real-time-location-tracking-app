let socket;
let map;
let markers = {};
let hasFlownToSelf = false;

const myIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const otherIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function initMap() {
  map = L.map("map").setView([0, 0], 4);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "rushit-kakadiya",
  }).addTo(map);
}

function updateMarkers(users) {
  for (let id in markers) {
    if (!users[id]) {
      map.removeLayer(markers[id]);
      delete markers[id];
    }
  }

  for (let id in users) {
    const { latitude, longitude } = users[id];
    if (markers[id]) {
      markers[id].setLatLng([latitude, longitude]);
    } else {
      markers[id] = L.marker([latitude, longitude], {
        icon: id === socket.id ? myIcon : otherIcon,
      })
        .addTo(map)
        .bindPopup(id === socket.id ? `👤 You (${id})` : `👥 ${id}`);
    }
  }
}

function updateUserList(users) {
  const userListDiv = document.getElementById("userList");
  userListDiv.innerHTML = "";

  for (let id in users) {
    const { latitude, longitude } = users[id];

    const userDiv = document.createElement("li");
    userDiv.className = "user";
    if (id === socket.id) {
      userDiv.classList.add("self");
      userDiv.innerText = `👤 You (${id})`;
    } else {
      userDiv.innerText = `👥 ${id}`;
    }

    userDiv.addEventListener("click", () => {
      const currentCenter = map.getCenter();
      const distance = map.distance(
        currentCenter,
        L.latLng(latitude, longitude)
      );

      if (distance > 5) {
        map.flyTo([latitude, longitude], 15, {
          animate: true,
          duration: 1.5,
        });
      }

      if (markers[id]) {
        markers[id].openPopup();
      }

      document
        .querySelectorAll(".user")
        .forEach((el) => el.classList.remove("selected"));
      userDiv.classList.add("selected");
    });

    userListDiv.appendChild(userDiv);
  }
}

function askLocationPermission() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      connectSocket(position.coords.latitude, position.coords.longitude);
    },
    async (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        const retry = confirm(
          "Location permission denied. Do you want to try again?"
        );
        if (retry) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          askLocationPermission();
        } else {
          alert("Cannot continue without location access.");
        }
      } else {
        alert("Failed to get your location. Try again.");
        console.error(error);
      }
    },
    { timeout: 10000, maximumAge: 0, enableHighAccuracy: true }
  );
}

function connectSocket(initialLatitude, initialLongitude) {
  socket = io();

  initMap();

  socket.emit("updateLocation", {
    latitude: initialLatitude,
    longitude: initialLongitude,
  });

  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("updateLocation", { latitude, longitude });

      if (!hasFlownToSelf) {
        map.flyTo([latitude, longitude], 15, {
          animate: true,
          duration: 1.5,
        });
        hasFlownToSelf = true;
      }
    },
    (err) => {
      console.error("Failed to watch location", err);
    },
    { timeout: 5000, maximumAge: 0, enableHighAccuracy: true }
  );

  socket.on("usersUpdate", (users) => {
    updateMarkers(users);
    updateUserList(users);
  });
}

askLocationPermission();
