import { careModel } from "../../databases/models/care.model.js";
import { AppError } from "../utils/AppError.js";
import { catchAsyncError } from "./catchAsyncError.js";

// check if mentor and patient have a care relationship
export const careRealationshipChecking = (param) => {
    return catchAsyncError(
        async (req, res, next) => {
            let patient;
            if (param === true) {
                patient = req.params.patient;

            } else {
                patient = req.body.patient;
            }
            const { role } = req.user;
            let result;
            if (role === 'mentor') {
                result = await careModel.findOne({ mentor: req.user._id, patients: { $in: [patient] } });
            } else if (role === 'patient') {
                result = await careModel.findOne({ mentor: patient, patients: { $in: [req.user._id] } });
            }
            if (!result) return next(new AppError(`there's something wrong`, 404));
            next()
        }
    );
};
// export const relationshipCheck = catchAsyncError(
//     async (req, res, next) => {
//         const {id} = req.body || req.params;
//         const medication = await medicationModel.find(id);
//         if(!medication) return next(new AppError(`medication not found`) , 404)
//         const care = await careModel.findOne({mentor: req.user._id, patients : {$in : [medication.patient]}})
//         if(!care) return next(new AppError(`there's something wrong`,404))
//         next()
//     }
// )
