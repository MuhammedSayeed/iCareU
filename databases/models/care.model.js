import mongoose from "mongoose";

const careSchema = new mongoose.Schema({
    mentor: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    patients: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})


export const careModel = mongoose.model('Care', careSchema)