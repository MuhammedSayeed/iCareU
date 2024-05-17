import { activityModel } from "../../../databases/models/activity.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

const updateActivity = catchAsyncError(
    async (req, res, next) => {
        const activity = await activityModel.findOneAndUpdate({ patient: req.user._id }, { type: req.activity });
        if (activity) {
            return res.json({ message: "activty updated successfully" })
        }
        return new AppError("activity is not found", 404)
    }
)
const getPatientsActivities = catchAsyncError(
    async (req, res, next) => {
        const activities = await activityModel.find({ mentor: req.user._id });
        if (activities) {
            return res.json({ message: "success" , result : activities })
        }
        return new AppError("there's something wrong", 404)
    }
)

export {
    updateActivity,
    getPatientsActivities
}