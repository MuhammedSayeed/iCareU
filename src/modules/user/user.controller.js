import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from "../../../databases/models/user.model.js";
import { sendEmail } from "../../emails/user.email.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { generateCode, generateExpireDate, generateToken, clearVerificationCode } from "../../utils/authUtils.js";
import { ApiFeatures } from '../../utils/ApiFeature.js';

const signUp = catchAsyncError(
    async (req, res, next) => {
        let { email } = req.body;
        let user = await userModel.findOne({ email });
        if (user) return next(new AppError(`email already exists`, 401))
        let result = new userModel(req.body);
        // generate Code with expiration date 20 minutes
        let code = generateCode();
        result.verificationCode.code = code;
        result.verificationCode.expireDate = generateExpireDate(20)
        await result.save();
        // generate verify token with expiration date 10 minutes
        let token = generateToken({ email: email }, 10)
        sendEmail(email, code, token)
        res.status(201).json({ message: "success" });
    }
)
const signIn = catchAsyncError(
    async (req, res, next) => {
        let { email, password } = req.body;
        console.log(password)
        let user = await userModel.findOne({ email });
        if (!user) return next(new AppError(`invalid email or password`, 404))
        const match = await bcrypt.compare(password, user.password);
        if (!match) return next(new AppError(`invalid email or password`, 404))
        let token = generateToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            verified: user.verified
        })
        res.status(201).json({ message: "success", token });
    }
)
const getAllUsers = catchAsyncError(
    async (req, res, next) => {
        let apiFeatures = new
            ApiFeatures(userModel, req.query)
            .paginate(20).fields()
            .sort().search();

        let users = await apiFeatures.mongooseQuery;

        // meta data info
        let totalUsers = await apiFeatures.totalDocs;
        let totalPages = Math.ceil(totalUsers / apiFeatures.limit);

        res.status(200).json({
            message: "success",
            meta: {
                currentPage: apiFeatures.currentPage,
                totalPages: totalPages,
                totalUsers: totalUsers
            },
            result: users,
        });
    }
)
const getUser = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let result = await userModel.findById(id);
        if (!result) return next(new AppError(`user not found`, 404))
        res.status(200).json({ message: "success", result: result });
    }
)
const updateUser = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) return next(new AppError(`user not found`, 404))
        res.status(200).json({ message: "success", result: result });
    }
)
const updatePassword = catchAsyncError(
    async (req, res, next) => {
        const { _id } = req.user;
        const { password, newPassword } = req.body;
        const passwordChangedAt = Date.now()
        let user = await userModel.findById(_id);
        const match = bcrypt.compare(password, user.password)
        if (!match) return next(new AppError(`invalid password`, 401))
        user.password = newPassword;
        user.passwordChangedAt = passwordChangedAt;
        user.save();
        let token = generateToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            verified: user.verified
        })
        res.status(200).json({ message: "success", result: token });
    }
)
const deleteUser = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let result = await userModel.findByIdAndDelete(id);
        if (!result) return next(new AppError(`user not found`, 404));
        res.status(200).json({ message: "success" });
    }
)
const forgotPassword = catchAsyncError(
    async (req, res, next) => {
        const { email } = req.body;
        let result = await userModel.findOne({ email: email });
        if (!result) return next(new AppError(`user not found`, 404));
        let code = generateCode();
        result.verificationCode.code = code;
        result.verificationCode.expireDate = generateExpireDate(2)
        result.save();
        sendEmail(email, code);
        res.status(201).json({ message: "success", user: { email: result.email } });

    }
)
const verifyResetPasswordCode = catchAsyncError(
    async (req, res, next) => {
        const { email, code } = req.body;
        let user = await userModel.findOne({ email: email });
        if (!user || !code == user.verificationCode.code || new Date() > user.verificationCode.expireDate) {
            return next(new AppError(`code is invaild or expired`, 404));
        }
        let token = generateToken({
            email: user.email,
            _id: user._id
        }, 45)
        clearVerificationCode(user)
        user.save();
        res.status(200).json({ message: "success", token: token })
    }
)
const confirmResetPassword = catchAsyncError(
    async (req, res, next) => {
        const { password } = req.body;
        const passwordChangedAt = Date.now()
        let user = await userModel.findOneAndUpdate({ email: req.user.email }, { password, passwordChangedAt }, { new: true });
        if (!user) return next(new AppError(`user not found`, 404));
        let token = generateToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            verified: user.verified
        }, 45)
        res.json({ message: "success", token })
    }
)
const verifyWithCode = catchAsyncError(async (req, res, next) => {
    const { code } = req.body;
    // check if the code is valid either code or expire date
    let user = await userModel.findOne({ email: req.user.email })
    if (!user) {
        return next(new AppError(`User not found`, 404));
    }
    if (user.verified === true) {
        return next(new AppError(`user already verified before`, 404));
    }
    if (!code == user.verificationCode.code || new Date() > user.verificationCode.expireDate) {
        return next(new AppError(`code is invaild or expired`, 404));
    }
    // if the code is valid , verify the user 
    user.verified = true;
    // clear the code from user doc
    clearVerificationCode(user)
    await user.save();
    let token = generateToken({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified
    })
    res.status(200).json({ message: "success", result: token })
})
const resendCode = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
        return next(new AppError(`User not found`, 404));
    }
    if (user.verified) {
        return next(new AppError(`User verifed before`, 401));
    }
    // generate code 
    let code = generateCode()
    user.verificationCode.code = code;
    user.verificationCode.expireDate = generateExpireDate(2)
    await user.save();
    // send email with verfication code
    sendEmail(email, code)
    res.status(201).json({ message: "success" });

})
const verifyWithToken = catchAsyncError(
    async (req, res, next) => {
        const { token } = req.params;
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) return next(new AppError({ message: "error in verify token or expired" }, 404));
            let user = await userModel.findOneAndUpdate({ email: decoded.email }, { verified: true }, { new: true });
            clearVerificationCode(user)
            user.save();
            res.status(200).json({ message: "email verified successfully" });
        })
    }
)
const protectedRoutes = catchAsyncError(async (req, res, next) => {
    let { token } = req.headers;
    if (!token) return next(new AppError(`token is not provided`, 401));
    let decoded = jwt.verify(token, process.env.JWT_KEY)
    let user = await userModel.findById(decoded._id);
    if (!user) return next(new AppError(`invalid token`, 404))
    // check if the user has changed his password before
    if (user.passwordChangedAt) {
        let changePasswordDate = parseInt(user.passwordChangedAt.getTime() / 1000);
        // comparing the token's time with the changePasswordDate
        if (changePasswordDate > decoded.iat) return next(new AppError(`invalid token`, 404))
    }
    req.user = decoded
    next()
})
const allowedTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError(`you are not authorized to access this route. you are ${req.user.role}`, 401))
        }
        next()
    })
}

export {
    signUp,
    signIn,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    verifyWithToken,
    verifyWithCode,
    resendCode,
    protectedRoutes,
    allowedTo,
    forgotPassword,
    verifyResetPasswordCode,
    confirmResetPassword,
    updatePassword
}