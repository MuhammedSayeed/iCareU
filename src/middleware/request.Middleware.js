import { careModel } from "../../databases/models/care.model.js"
import { requestModel } from "../../databases/models/request.model.js";
import { AppError } from "../utils/AppError.js";
import { catchAsyncError } from "./catchAsyncError.js"

export const requestChecking = catchAsyncError(
    async (req,res,next) => {
        const { id } = req.body;
        const care = await careModel.findOne({
            patients: { $in: [id] },
            mentor : {$ne : req.user._id}
        }
        )
        if (care) return next(new AppError(`you can't add this patient` , 401));
        const filter = {
            patient : id,
            mentor : req.user._id,
        }
        const perviousCareReqest = await requestModel.findOne(filter);
        if (perviousCareReqest) return next(new AppError(`requset sent before` , 401));
        
        next();
    }
)