import { io } from "socket.io-client";
import { MESSAGE_RELAY } from '../config/1314272676_entrypoint'

const URL = MESSAGE_RELAY;

const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
    console.log("socket", event, args);
});

export default socket;