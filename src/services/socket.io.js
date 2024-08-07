import { getUserIdFromSocket } from "./utils.js";


let users = {};
export const socketConnection = (io) => {
    io.on('connection', (socket) => {
        const userId = getUserIdFromSocket(socket);
        if (userId) {
            socket.join(userId);
            users[userId] = socket.id;
            socket.on("disconnect", () => {
                console.log("client disconnected");
                socket.leave(userId);
            })
        }
        socket.on("fallTimeout", (data) => {
            let patientName = data.patientName;
            let mentorId = data.mentor;
            io.to(mentorId).emit("mentorWarning", {
                message: `${patientName} is not ok`
            })
        })
        // send private message 
        socket.on("sendMessage", (data) => {
            const { to, message } = data;
            const recipientSocketId = users[to];
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("getMessage", {
                    from: socket.handshake.query.userId,
                    message: message
                })
            }
        })
    })
}
