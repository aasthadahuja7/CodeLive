const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

const PORT = 3000;
const users = {};
function getCounts() {
    const counts = {};

    for (const socketId in users) {
        const problem = users[socketId];

        if (!counts[problem]) {
            counts[problem] = 0;
        }

        counts[problem]++;
    }

    return counts;
}
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

 console.log("A user connected!");
    // console.log("Their socket ID is:", socket.id);
	socket.on("hello", (message) => {
        console.log("Browser says:", message);
    });
socket.on("problemJoined", (problem) => {
   users[socket.id] = problem;

    console.log("Users:", users);

    const counts = getCounts();

    console.log("Counts:", counts);

    io.emit("countsUpdated", counts);
});
    socket.on("disconnect", () => {
         console.log("A user disconnected:", socket.id);

    delete users[socket.id];

    const counts = getCounts();

    io.emit("countsUpdated", counts);
    });

});

server.listen(PORT, () => {
    console.log(`CodeLive is running at http://localhost:${PORT}`);
});