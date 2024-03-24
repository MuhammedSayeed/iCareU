import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    chat: {
        type: mongoose.Types.ObjectId,
        ref: "Chat",
        required: true
    }
})

export const messageModel = mongoose.model('Message', messageSchema);

