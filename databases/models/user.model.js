import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    passwordChangedAt: Date,
    profilePic: String,
    role: {
        type: String,
        enum: ['mentor', 'patient' , 'admin'],
        default: 'patient'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        code: { type: String },
        expireDate: { type: Date }
    },
    verified: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})
userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, Number(process.env.ROUND))
})
userSchema.pre('findOneAndUpdate', async function () {
    if(this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, Number(process.env.ROUND))
    }
})

export const userModel = mongoose.model('User', userSchema)

