import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { chatModel } from '../../../databases/models/chat.model.js'
import { ApiFeatures } from "../../utils/ApiFeature.js";

const updateActivity = catchAsyncError(
    async (req, res, next) => {
        
    }
)



export {
    updateActivity
}