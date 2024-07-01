import { getUserIdFromSocket } from "./utils.js";


let users = {};
export const socketConnection = (io) => {
    io.on('connection', (socket) => {
        const userId = getUserIdFromSocket(socket);
        console.log("id form socket ", getUserIdFromSocket(socket));
        if (userId) {
            socket.join(userId);
            socket.on("disconnect", () => {
                console.log("client disconnected");
                socket.leave(userId);
            })
        }
        // falling activity notification
        socket.on("fallTimeout", (data) => {
            let patientName = data.patientName;
            let mentorId = data.mentor;
            io.to(mentorId).emit("mentorWarning", {
                message: `${patientName} is Falling`
            })
        })
        // send private message 
        socket.on("sendMessage", (data) => {
            const { to, message } = data;
            console.log(data);
            const recipientSocketId = users[to];
            console.log(recipientSocketId);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("getMessage", {
                    // we can modifey
                    from: socket.handshake.query.userId,
                    message: message
                })
            }
        })
        // typing feature
        socket.on('typing', (data) => {
            const { to } = data;
            console.log(data);
            const recipientSocketId = users[to];
            if (recipientSocketId) {
                io.to(recipientSocketId).emit('typing', {
                    from: {
                        _id: userId,
                        name: data.from.name,
                        email: data.from.email
                    },
                    message: "typing.."
                });
            }
        });
    })
}