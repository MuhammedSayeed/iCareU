import { messageModel } from "../../../databases/models/message.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";


const sendMessage = catchAsyncError(
    async (req, res, next) => {
        const { content, id } = req.body;
        let message = new messageModel({
            chat: id,
            sender: req.user._id,
            content: content
        })
        await message.save();
        const result = await message.populate('sender', "_id name email role")
        res.json({ message: "success", result: result });
    }
)
const allMessageOfChat = catchAsyncError(
    async (req, res, next) => {
        const {id} = req.body;
        let messages = await messageModel.find({chat: id}).populate('sender' , "_id name email")
        res.json({message : "success" , result : messages});
    }
)


export {
    sendMessage,
    allMessageOfChat
}