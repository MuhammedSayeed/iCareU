import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    mentor: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['Fall', 'Up Stairs', 'Jumping', 'Standing', 'Walking', 'Down Stairs', 'Joging', 'Sitting'],
        default: null
    }
}, {
    timestamps: true
})


export const activityModel = mongoose.model('Activity', activitySchema)