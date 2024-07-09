import { chatModel } from "../../../databases/models/chat.model.js";
import { messageModel } from "../../../databases/models/message.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeature.js";


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
        res.status(200).json({ message: "success" });
    }
)
const allMessageOfChat = catchAsyncError(
    async (req, res, next) => {
        const { id: _id } = req.body;
        let apiFeatures = new ApiFeatures(messageModel, { chat: _id }).paginate(20)
        let messages = await apiFeatures.mongooseQuery.select("-_id -__v -chat");
        console.log(messages);
        let totalMessages = await messageModel.countDocuments({ chat: _id });
        let totalPages = Math.ceil(totalMessages / apiFeatures.limit);
        res.status(200).json({
            message: "success",
            meta: {
                currentPage: apiFeatures.currentPage,
                totalMessages: totalMessages,
                totalPages: totalPages
            },
            results: messages,
        });
    }
)


export {
    sendMessage,
    allMessageOfChat
}