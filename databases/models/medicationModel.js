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
    afterMeal: {
        type: Boolean,
        default: false
    },
    beforeMeal: {
        type: Boolean,
        default: false
    },
    time: {
        hour: {
            type: Number,
        },
        minutes: {
            type: Number,

        },
        system: {
            type: String,
            enum: ["PM", "AM"],
            default: null
        }
    }
}, {
    timestamps: true
});

export const medicationModel = mongoose.model('Medication', medicationSchema);

