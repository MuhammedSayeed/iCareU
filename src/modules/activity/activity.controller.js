import { activityModel } from "../../../databases/models/activity.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

const updateActivity = catchAsyncError(
    async (req, res, next) => {
        const activity = await activityModel.findOneAndUpdate({ patient: req.user._id }, { type: req.activity });
        if (!activity) {
            const newActivity = new activityModel({
                patient : req.user._id,
                type : req.activity,
            })
            await newActivity.save();
        }
        res.json({ message: "activty updated successfully" })

    }
)
const getPatientsActivities = catchAsyncError(
    async (req, res, next) => {
        const activities = await activityModel.find({ mentor: req.user._id });
        if (activities) {
            return res.json({ message: "success" , result : activities })
        }
        return new AppError("there's something wrong or there is not activities not recoreded yet", 404)
    }
)

export {
    updateActivity,
    getPatientsActivities
}