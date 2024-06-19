import { locationModel } from "../../../databases/models/location.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

const updateLocation = catchAsyncError(
    async (req, res, next) => {
        const { longitude, latitude } = req.body;
        let location = await locationModel.findOneAndUpdate({ patient: req.user._id, longitude: longitude, latitude: latitude });
        // if not location assgined to user yet
        if (!location) {
            let newLocation = new locationModel({
                longitude: longitude,
                latitude: latitude,
                patient: req.user._id
            })
            await newLocation.save();
            return res.status(200).json({ message: "location updated successfully" })
        }
        res.status(200).json({ message: "location updated successfully" })
    }
)

const getLocationOfPatient = catchAsyncError(
    async (req, res, next) => {
        const { patient } = req.params;
        const location = await locationModel.findOne({ patient: patient });
        if (!location) return next(new AppError(`there are something wrong`, 401))
        res.status(200).json({ message: "sucess", location: location });
    }
)

export {
    updateLocation,
    getLocationOfPatient
}