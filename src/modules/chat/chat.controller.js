import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { chatModel } from '../../../databases/models/chat.model.js'
import { ApiFeatures } from "../../utils/ApiFeature.js";

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
        const apiFeatures = new ApiFeatures(chatModel, req.query, _id).paginate(10);
        const chats = await apiFeatures.mongooseQuery.populate("members", "name email _id role");
        // meta data info
        let totalUsers = await apiFeatures.totalDocs;
        let totalPages = Math.ceil(totalUsers / apiFeatures.limit);
        let meta = {}
        if (chats.length > 0) {
            meta = {
                currentPage: apiFeatures.currentPage,
                totalPages: totalPages,
                totalChats: totalUsers
            }
        }
        res.status(200).json({
            message: "success",
            meta: meta,
            result: chats,
        });
    }
)


export {
    userChats,
    createChat
}