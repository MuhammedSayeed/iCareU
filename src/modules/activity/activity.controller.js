import { activityModel } from "../../../databases/models/activity.model.js";
import { io } from "../../../server.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

const updateActivity = catchAsyncError(
    async (req, res, next) => {
        const { _id } = req.user;
        const activity = await activityModel.findOneAndUpdate({ patient: _id }, { type: req.activity });
        console.log(activity);
        if (req.activity === "Fall") {
            io.to(_id.toString()).emit("fallingNotification", {
                message: "Are you ok?",
                mentor: activity.mentor
            })
        }
        res.json({ message: "activty updated successfully" })

    }
)
const getPatientsActivities = catchAsyncError(
    async (req, res, next) => {
        const activities = await activityModel.find({ mentor: req.user._id });
        if (activities) {
            return res.json({ message: "success", result: activities })
        }
        return new AppError("there's something wrong or there is not activities not recoreded yet", 404)
    }
)

export {
    updateActivity,
    getPatientsActivities
}