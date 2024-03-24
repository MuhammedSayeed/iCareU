import { careModel } from "../../../databases/models/care.model.js";
import { requestModel } from "../../../databases/models/request.model.js";
import { userModel } from "../../../databases/models/user.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

const addPatient = catchAsyncError(
    async (req, res, next) => {
        const patient = await userModel.findById({ _id: req.body.id });
        if (!patient) return next(new AppError(`patient not found`, 401));
        let result = new requestModel({
            patient: req.body.id,
            mentor: req.user._id
        })
        result.save();
        res.json({ message: "success", result: result });
    }
)
const removePatient = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let result = await careModel.findByIdAndUpdate({ _id: id }, { $pull: { patients: req.body.patient } }, { new: true });
        if (!result) return next(new AppError(`there's something wrong`, 404));
        res.status(201).json({ message: "success", result: result })
    }
)
const getPatients = catchAsyncError(
    async (req, res, next) => {
        const result = await careModel.find({ mentor: req.user._id }).populate('patients mentor', '_id email name role')
        res.json({ message: "success", result: result })
    }
)

export {
    addPatient,
    getPatients,
    removePatient
}