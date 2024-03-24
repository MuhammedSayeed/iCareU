import { chatModel } from "../../databases/models/chat.model.js";
import { AppError } from "../utils/AppError.js";
import { catchAsyncError } from "./catchAsyncError.js";


export const chatChecking = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.body;
        let result = await chatModel.findOne({ _id: id, members: { $in: [req.user._id] } });
        if (!result) return next(new AppError(`there's something wrong`, 404));
        next()
    }
)