import {io} from "socket.io-client";
import bcrypt from "bcryptjs-react";
bcrypt.setRandomFallback(window.crypto.getRandomValues);
const token = bcrypt.hashSync(import.meta.env.VITE_SOCKET_TOKEN, Number.parseInt(import.meta.env.VITE_SALT));
const socket = io(import.meta.env.VITE_SOCKET_URL, {
    secure: true,
    auth: {
        token
    }
});
export {socket}