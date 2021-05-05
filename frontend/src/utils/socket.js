import { io } from "socket.io-client";
import { MESSAGE_RELAY, MESSAGE_RELAY_PATH } from '../config/1314272676_entrypoint'

const socket = io(MESSAGE_RELAY, { autoConnect: false, secure: true, path: MESSAGE_RELAY_PATH })

socket.onAny((event, ...args) => {
    console.log("socket", event, args)
});

export default socket;