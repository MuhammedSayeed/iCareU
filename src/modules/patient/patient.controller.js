import { activityModel } from "../../../databases/models/activity.model.js";
import { careModel } from "../../../databases/models/care.model.js";
import { requestModel } from "../../../databases/models/request.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

const confirmCare = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let careReq = await requestModel.findOne({ _id: id, patient: req.user._id });
        if (!careReq) return next(new AppError(`there's something wrong`, 401));
        if (careReq.status === "accepted" || careReq.status === "rejected") return next(new AppError(`this request is approved or decliend before`, 401));
        // approve care request
        careReq.status = "accepted";
        await careReq.save();
        // assgin mentor id to activty of patient
        const activity = await activityModel.findOne({ patient: req.user._id });
        if (activity) {
            activity.mentor = careReq.mentor;
            await activity.save();
        }
        // check if user already has people to care or first time
        let care = await careModel.findOne({ mentor: careReq.mentor });
        if (care) {
            care.patients.addToSet(careReq.patient);
            await care.save();
            return res.json({ message: "success", result: care })
        }
        // first time to care someone
        let newCare = new careModel({
            mentor: careReq.mentor
        });
        newCare.patients.addToSet(careReq.patient);
        await newCare.save();
        res.json({ message: "success", result: newCare });
    }
)
const declineCare = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let careReq = await requestModel.findOne({ _id: id, patient: req.user._id });
        if (!careReq) return next(new AppError(`there's something wrong`, 401));
        if (careReq.status === "pending") {
            careReq.status = "rejected";
            await careReq.save();
            res.json({ message: "success", result: careReq });
        }
        return next(new AppError(`there's something wrong`, 401));
    }
)
const pateintRequests = catchAsyncError(
    async (req, res, next) => {
        const filter = {
            patient: req.user._id,
            status: "pending"
        }
        let requests = await requestModel.find(filter).populate('mentor', '_id email name');
        res.json({ message: "success", result: requests })
    }
)

const getMyMentor = catchAsyncError(async (req, res, next) => {
    let care = await careModel.findOne({ patients: { $in: [req.user._id] } }).populate('mentor', '_id email name');
    if (!care) return next(new AppError(`patient don't have mentor yet`, 401));
    res.json({ message: "success", result: care.mentor });
})
export {
    confirmCare,
    declineCare,
    pateintRequests,
    getMyMentor
}