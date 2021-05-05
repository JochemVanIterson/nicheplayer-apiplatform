const ORIGIN = process.env.ORIGIN ? process.env.ORIGIN.split(', ') : ['http://nicheplayer-dev.audioware.nl'];
const httpPort = 3000;

const _ = require('lodash');
const http = require("http")
const httpServer = http.createServer();
const { Server } = require("socket.io");
const io = new Server({
    cors: {
        origin: ORIGIN,
    },
    secure: true,
    rejectUnauthorized: false
});
io.attach(httpServer);

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});
const rooms = [];

io.on("connection", (socket) => {
    console.log('a user connected');
    // fetch existing users
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }
    socket.emit("users", users);

    // notify existing users
    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.username,
    });

    socket.on("logout", () => {
        console.log('rooms', rooms)
        for (const id in rooms) {
            console.log('room', id)
            _.remove(rooms[id], (n) => n === socket.username)
            io.emit("room userCount/" + id, rooms[id].length)

        }
        console.log("a user logged out")
    })

    // forward the private message to the right recipient
    socket.on("private message", ({ content, to }) => {
        socket.to(to).emit("private message", {
            content,
            from: socket.id,
        });
    });
    socket.on("room enter", (id) => {
        if (!rooms[id]) rooms[id] = [socket.username]
        else if (!rooms[id].includes(socket.username)) rooms[id].push(socket.username)
        console.log('userCount enter', id, rooms[id].length, rooms[id])
        io.emit("room userCount/" + id, rooms[id].length)
    })
    socket.on("room leave", (id) => {
        if (!rooms[id]) rooms[id] = []
        _.remove(rooms[id], (n) => n === socket.username)
        console.log('userCount leave', id, rooms[id].length, rooms[id])
        io.emit("room userCount/" + id, rooms[id].length)
    })
    socket.on("room message", ({ content, room }) => {
        socket.broadcast.emit("room message/" + room, {
            content,
            from: socket.id,
        });
    })

    // notify users upon disconnection
    socket.on("disconnect", () => {
        socket.broadcast.emit("user disconnected", socket.id);
    });
});

httpServer.listen(httpPort, function () {
    console.log(`Listening HTTP on ${httpPort}`);
});

// setInterval(()=>{console.log()}, 2000)