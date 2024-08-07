import express from 'express';
import * as controller from './user.controller.js'
import { validation } from '../../middleware/validation.js';
import {
    codeSchema,
    confirmResetPasswordSchema,
    emailSchema,
    signInSchema,
    signUpSchema,
    updatePasswordSchema,
    updateUserSchema,
    verifyResetPasswordCodeSchema,
} from '../../validations/user.js';
import { idSchema } from '../../validations/global.js';

const userRouter = express.Router();


userRouter.route('/signup').post(validation(signUpSchema), controller.signUp)

userRouter.route('/signin').post(validation(signInSchema), controller.signIn)

userRouter.route('/update-user').put(controller.protectedRoutes, validation(updateUserSchema), controller.updateUser)

userRouter.route('/update-password').patch(controller.protectedRoutes, validation(updatePasswordSchema), controller.updatePassword)

userRouter.route('/forgotpassword').post(validation(emailSchema), controller.forgotPassword)

userRouter.route('/verify-reset-password-code').post(validation(verifyResetPasswordCodeSchema), controller.verifyResetPasswordCode)

userRouter.route('/confirm-reset-password').patch(controller.protectedRoutes, validation(confirmResetPasswordSchema), controller.confirmResetPassword)

userRouter.route('/verify/:token').get(controller.verifyWithToken)

userRouter.route('/verifycode').post(controller.protectedRoutes, validation(codeSchema), controller.verifyWithCode)

userRouter.route('/resendcode').post(validation(emailSchema), controller.resendCode)





export default userRouter    