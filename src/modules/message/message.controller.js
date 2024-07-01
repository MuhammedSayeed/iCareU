import { chatModel } from "../../../databases/models/chat.model.js";
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
        await chatModel.findOneAndUpdate({ _id: id }, { lastMesssage: content })
        res.json({ message: "success" });
    }
)
const allMessageOfChat = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.body;
        let messages = await messageModel.find({ chat: id }).select("-_id -chat -__v")
        res.json({ message: "success", results: messages });
    }
)


export {
    sendMessage,
    allMessageOfChat
}