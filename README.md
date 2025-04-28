# 🌍 Real-Time Location Tracking App

- Live location tracking web app built with **Node.js**, **Express**, **Socket.IO**, and **Leaflet**.
- Users can view and track each other's locations on an interactive map, updated in real-time.

---

## 🚀 Features

- 🔥 Real-time geolocation tracking with WebSockets
- 🗺️ Interactive map using Leaflet + OpenStreetMap
- 👥 Live online users list with clickable jump-to-user
- 📡 Auto-updating user locations
- 📍 Different icons for your marker and others
- 📱 Responsive & mobile-friendly
- ⚡ Fast, lightweight, and efficient

---

## 🛠️ Tech Stack

| Technology    | Purpose                   |
| ------------- | ------------------------- |
| Node.js       | Backend runtime           |
| Express.js    | Server and routing        |
| Socket.IO     | Real-time communication   |
| EJS           | Templating engine         |
| Leaflet.js    | Interactive map rendering |
| Vanilla JS    | Frontend interactions     |
| OpenStreetMap | Map tile provider         |

---

## 🧰 How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/rushit-kakadiya/real-time-location-tracking-app.git
   cd real-time-location-tracking-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to: [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```bash
.
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
├── views/
│   └── index.ejs
├── server.js
├── package.json
```

---

## 🔒 Permissions

- The app requests browser location permissions.
- If denied, users are asked to retry.
- High accuracy mode is enabled for precise location updates.

---

## 📢 Contributing

Contributions are welcome!  
Feel free to open issues, fork the repo, and submit PRs.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---
