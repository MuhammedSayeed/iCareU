import { careModel } from "../../../databases/models/care.model.js";
import { requestModel } from "../../../databases/models/request.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

const confirmCare = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let careReq = await requestModel.findOne({ _id: id, patient: req.user._id });
        if (!careReq) return next(new AppError(`there's something wrong`, 401));
        if (careReq.status === "accepted" || careReq.status === "rejected") return next(new AppError(`there's something wrong`, 401));
        // approve care request
        careReq.status = "accepted";
        careReq.save();
        // check if user already has people to care or first time
        let care = await careModel.findOne({ mentor: careReq.mentor });
        if (care) {
            care.patients.addToSet(careReq.patient);
            care.save();
            return res.json({ message: "success", result: care })
        }
        // first time to care someone
        let newCare = new careModel({});
        newCare.mentor = careReq.mentor;
        newCare.patients.addToSet(careReq.patient);
        newCare.save();
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
            careReq.save();
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
export {
    confirmCare,
    declineCare,
    pateintRequests
}