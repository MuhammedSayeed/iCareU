import { careModel } from "../../databases/models/care.model.js";
import { chatModel } from "../../databases/models/chat.model.js";
import { requestModel } from "../../databases/models/request.model.js";
import { AppError } from "../utils/AppError.js";
import { catchAsyncError } from "./catchAsyncError.js";


export const careRealationshipChecking = (param = false) => {
    return catchAsyncError(
        async (req, res, next) => {
            let patient;
            const { role } = req.user;
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
export const careRelationCheck = () => {
    return catchAsyncError(
        async (req, res, next) => {
            const { role } = req.user;
            let patient;
            let mentor;
            if (role === 'patient') {
                patient = req.user._id;
                mentor = req.body.id;
            }
            else if (role === 'mentor') {
                patient = req.body.id;
                mentor = req.user._id;
            } else {
                return next(new AppError(`you can't perform this action`, 401));
            }
            const care = await careModel.findOne({
                mentor: mentor,
                patients: { $in: [patient] }
            }
            )
            if (!care) return next(new AppError(`there's something wrong`, 401));
            next()
        }
    )
}
export const requestChecking = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.body;
        const prevRequst = await requestModel.findOne({ mentor: req.user._id, patient: id });
        if (prevRequst) return next(new AppError(`request sent before`, 404));
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