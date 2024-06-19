import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    longitude : {
        type : Number,
        default : 0
    },
    latitude : {
        type : Number,
        default : 0
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
    
    // ,
    // mentor: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User'
    // }
}, {
    timestamps: true
})


export const locationModel = mongoose.model('Location', locationSchema)