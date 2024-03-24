import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    mentor: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
}, {
    timestamps: true
});

export const requestModel = mongoose.model('Request', requestSchema);

