const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

let users = {};

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  users[socket.id] = { latitude: 0, longitude: 0 };
  io.emit("usersUpdate", users);

  socket.on("updateLocation", (coords) => {
    if (users[socket.id]) {
      users[socket.id].latitude = coords.latitude;
      users[socket.id].longitude = coords.longitude;
    }
    io.emit("usersUpdate", users);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete users[socket.id];
    io.emit("usersUpdate", users);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
