import { io } from "socket.io-client";

export default function useScoket(path: string) {
    const socket = io(`http://localhost:3001/${path}`)
    return socket
}