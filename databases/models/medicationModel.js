import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
    },
    shape: {
        type: String,
        enum: ['drink', 'pill', 'rivet', 'Injection'],
        default: 'drink'
    },
    dosage: {
        type: Number,
    },
    repeatFor: {
        type: Number,
    },
    time: {
        hour: {
            type: Number,
        },
        minutes: {
            type: Number,

        }
    }
}, {
    timestamps: true
});

export const medicationModel = mongoose.model('Medication', medicationSchema);

