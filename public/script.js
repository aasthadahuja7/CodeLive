const socket = io();

console.log("Connected to server!");

function joinProblem(problem) {

    console.log("I am solving:", problem);

    socket.emit("problemJoined", problem);

    document.getElementById("status").innerText =
        "You are solving: " + problem;
}