import { medicationModel } from "../../../databases/models/medicationModel.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

const addMedication = catchAsyncError(
    async (req, res, next) => {
        const { name, shape } = req.body;
        let check = await medicationModel.findOne({ name, shape });
        if (check) return next(new AppError(`the ${name} added before`, 401))
        let medication = new medicationModel({
            patient: req.body.patient,
            name: name,
            shape: shape,
            dosage: req.body.dosage,
            repeatFor: req.body.repeatFor,
            time: {
                hour: req.body.hour,
                minutes: req.body.minutes
            }
        })
        await medication.save();
        res.json({ message: "success", result: medication })
    }
)
const updateMedication = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        const updatedMedication = {
            name: req.body.name,
            shape: req.body.shape,
            dosage: req.body.dosage,
            repeatFor: req.body.repeatFor,
            time: {
                hour: req.body.hour,
                minutes: req.body.minutes
            }
        }
        let result = await medicationModel.findByIdAndUpdate(id, updatedMedication, { new: true });
        if (!result) return next(new AppError(`medication not found`, 404))
        res.status(200).json({ message: "success", result: result });
    }
)
const removeMedication = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let result = await medicationModel.findByIdAndDelete(id);
        if (!result) return next(new AppError(`medication not found`, 404));
        res.status(200).json({ message: "success" });
    }
)
const getMedication = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let result = await medicationModel.findById(id).populate('patient', 'name id')
        if (!result) return next(new AppError(`medication not found`, 404))
        res.status(200).json({ message: "success", result: result });
    }
)
const getAllMedications = catchAsyncError(
    async (req, res, next) => {
        const { patient } = req.params;
        let result = await medicationModel.find({ patient }).populate('patient', 'name id')
        if (!result) return next(new AppError(`patient medication's not found`));
        res.status(200).json({ message: "success", result: result });
    }
)
export {
    addMedication,
    updateMedication,
    removeMedication,
    getMedication,
    getAllMedications
}