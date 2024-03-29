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
} from './user.validation.js';
import { idSchema } from '../../global/validationSchema.js';

const userRouter = express.Router();

userRouter.route('/').get(controller.getAllUsers)

userRouter.route('/signup').post(validation(signUpSchema), controller.signUp)

userRouter.route('/signin').post(validation(signInSchema), controller.signIn)

userRouter.route('/:id').get(controller.protectedRoutes, validation(idSchema), controller.getUser)
    .put(controller.protectedRoutes, validation(updateUserSchema), controller.updateUser)
    .delete(controller.protectedRoutes, validation(idSchema), controller.deleteUser)

userRouter.route('/update-password').patch(controller.protectedRoutes, validation(updatePasswordSchema), controller.updatePassword)

userRouter.route('/forgotpassword').post(validation(emailSchema), controller.forgotPassword)

userRouter.route('/verify-reset-password-code').post(validation(verifyResetPasswordCodeSchema), controller.verifyResetPasswordCode)

userRouter.route('/confirm-reset-password').patch(controller.protectedRoutes, validation(confirmResetPasswordSchema), controller.confirmResetPassword)

userRouter.route('/verify/:token').get(controller.verifyWithToken)

userRouter.route('/verifycode').post(controller.protectedRoutes, validation(codeSchema), controller.verifyWithCode)

userRouter.route('/resendcode').post(validation(emailSchema), controller.resendCode)





export default userRouter    