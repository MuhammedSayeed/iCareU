import express from 'express';
import * as userController from './user.controller.js'
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

userRouter.route('/').get(
    userController.getAllUsers)

userRouter.route('/signup').post(
    validation(signUpSchema),
    userController.signUp)

userRouter.route('/signin').post(
    validation(signInSchema),
    userController.signIn)

userRouter.route('/:id').get(userController.protectedRoutes, validation(idSchema), userController.getUser)
    .put(userController.protectedRoutes, validation(updateUserSchema), userController.updateUser)
    .delete(userController.protectedRoutes, validation(idSchema), userController.deleteUser)

userRouter.route('/update-password')
    .patch(userController.protectedRoutes, validation(updatePasswordSchema), userController.updatePassword)

userRouter.route('/forgotpassword').post(validation(emailSchema), userController.forgotPassword)

userRouter.route('/verify-reset-password-code').post(
    validation(verifyResetPasswordCodeSchema),
    userController.verifyResetPasswordCode)

userRouter.route('/confirm-reset-password').patch(
    userController.protectedRoutes,
    validation(confirmResetPasswordSchema),
    userController.confirmResetPassword)

userRouter.route('/verify/:token').get(userController.verifyWithToken)

userRouter.route('/verifycode').post(
    userController.protectedRoutes,
    validation(codeSchema),
    userController.verifyWithCode
)
userRouter.route('/resendcode').post(validation(emailSchema), userController.resendCode)





export default userRouter    