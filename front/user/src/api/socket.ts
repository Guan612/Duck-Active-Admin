import { io } from "socket.io-client";

export default function useScoket(path: string) {
    const socket = io(import.meta.env.VITE_SOCKET_URL + `/${path}`)
    return socket
}