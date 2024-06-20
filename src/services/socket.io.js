import { getUserIdFromSocket } from "./utils.js";

export const socketConnection = (io)=>{
    // io.on('connection', (socket) => {
    //     const userId = getUserIdFromSocket(socket);
    //     console.log("id form socket ",getUserIdFromSocket(socket));
    //     if (userId) {
    //         socket.join(userId);
    //         socket.on("disconnect", () => {
    //             console.log("client disconnected");
    //             socket.leave(userId);
    //         })
    //     }
    // })
}