import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { chatModel } from '../../../databases/models/chat.model.js'


const createChat = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.body;
        const chat = await chatModel.findOne({
            members: { $all: [id, req.user._id] }
        }).populate('members', "_id name email role")
        if (!chat) {
            const newChat = new chatModel({
                members: [id, req.user._id]
            })
            await newChat.save();
            const result = await newChat.populate("members", "_id name email role");
            return res.status(200).json({ message: "success", results: result })
        }
        return res.status(200).json({ message: "success", results: chat })
    }
)
const userChats = catchAsyncError(
    async (req, res, next) => {
        const { _id } = req.user;
        const chats = await chatModel.find({ members: { $in: _id } }).populate("members" , "name _id role");
        res.status(200).json({ results: chats })
    }
)


export {
    userChats,
    createChat
}