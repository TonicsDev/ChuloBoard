import dotenv from "dotenv";
import http from "node:http";
dotenv.config();
import app from "./app.js";
import { Server } from "socket.io";
import bcrypt from "bcrypt";
import { ENV_VARIABLES } from "./env_variables.js";
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.ORIGIN,
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true
    }
});
io.use(async (socket, next) => {
    if(!socket.handshake.auth)return next(new Error("Invalid credentials"));
    const {token} = socket.handshake.auth;
    const result = await bcrypt.compare(process.env.SOCKET_TOKEN, token).catch(err => {
        return false;
    });
    if(!result) return next(new Error("Invalid credentials"));
    next();
});

io.on("connection", (socket) => {
    socket.on("join-channel", channel => {
        socket.join(channel);
    });
    socket.on("leave-channel", (channel) => {
        socket.leave(channel);
    });
    socket.on("new-register", register => {
        switch(register.type) {
            case "song":
                socket.to(process.env.VITE_CHANNEL).emit('new-song', register);
                break;
        }
    });

    socket.on("music-controlls", action => {
        switch(action.type) {
            case "play":
                socket.to(process.env.VITE_CHANNEL).emit('play-music');
                break;
            case "pause":
                socket.to(process.env.VITE_CHANNEL).emit('pause-music');
                break;
            case "volume":
                socket.to(process.env.VITE_CHANNEL).emit('volume-music', action.volume);
                break;
        }
    });

    socket.on("trigger-guau", (data) => {
        socket.to(ENV_VARIABLES.VITE_CHANNEL + data.id).emit("guau-alert");
    });

    socket.on("trigger-card", (data) => {
        socket.to(ENV_VARIABLES.VITE_CHANNEL + data.id).emit("new-card", {
            cards: data.cards,
            user: data.user
        })
    });

    socket.on("notify-bot", (message) => {
        socket.to(process.env.BOT_ROOM).emit("notification", message);
    });
});

httpServer.listen(app.get("PORT"));
console.log("Server on port ", app.get("PORT"));
export {io}