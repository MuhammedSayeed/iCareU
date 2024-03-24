import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
})

export const chatModel = mongoose.model('Chat', chatSchema);

