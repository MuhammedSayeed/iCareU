import { careModel } from "../../databases/models/care.model.js";
import { chatModel } from "../../databases/models/chat.model.js";
import { requestModel } from "../../databases/models/request.model.js";
import { AppError } from "../utils/AppError.js";
import { catchAsyncError } from "./catchAsyncError.js";

// check if mentor and patient have a care relationship

export const careRealationshipChecking = (param = false) => {
    return catchAsyncError(
        async (req, res, next) => {
            let patient;
            const { role } = req.user;
            console.log(req.user)
            if (param === true) {
                patient = req.params.patient;

            } else {
                patient = req.body.patient;
            }
            if (role === 'patient') {
                return next();
            }
            if (role === 'mentor') {
                let result = await careModel.findOne({ mentor: req.user._id, patients: { $in: [patient] } });
                if (result) return next();
            }
            return next(new AppError(`there's something wrong`, 404));
        }
    )
}

export const requestChecking = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.body;
        const care = await careModel.findOne({
            patients: { $in: [id] },
            mentor: { $ne: req.user._id }
        }
        )
        if (care) return next(new AppError(`you can't add this patient`, 401));
        const filter = {
            patient: id,
            mentor: req.user._id,
        }
        const perviousCareReqest = await requestModel.findOne(filter);
        if (perviousCareReqest) return next(new AppError(`requset sent before`, 401));
        next();
    }
)
export const chatChecking = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.body;
        let result = await chatModel.findOne({ _id: id, members: { $in: [req.user._id] } });
        if (!result) return next(new AppError(`there's something wrong`, 404));
        next()
    }
)