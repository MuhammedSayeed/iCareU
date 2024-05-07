import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    mentor : {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    type : {
        type : String,
        enum: ['Standing', 'Sitting', 'Stairs Down', 'Stairs Up' , 'Walking' , 'Jogging' , 'Running' ,'Jumping' , 'Falling'],
        default : 'Sitting'
    }
}, {
    timestamps: true
})


export const activityModel = mongoose.model('Activity', activitySchema)