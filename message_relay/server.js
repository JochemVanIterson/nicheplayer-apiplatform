const ORIGIN = process.env.ORIGIN ? process.env.ORIGIN.split(', ') : ['http://mbp.audioware.nl'];
const PORT = 3000

const httpServer = require("http").createServer();
const { Server } = require("socket.io");
const io = new Server(httpServer, {
    cors: {
        origin: ORIGIN,
    }
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

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

    // forward the private message to the right recipient
    socket.on("private message", ({ content, to }) => {
        socket.to(to).emit("private message", {
            content,
            from: socket.id,
        });
    });

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

httpServer.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});