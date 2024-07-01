import { globalErrorMiddleware } from "./middleware/globalErrorMiddleware.js"
import activityRouter from "./modules/activity/activity.router.js"
import chatRouter from "./modules/chat/chat.router.js"
import locationRouter from "./modules/location/location.router.js"
import medicationRouter from "./modules/medication/medication.router.js"
import mentorRouter from "./modules/mentor/mentor.router.js"
import messageRouter from "./modules/message/message.router.js"
import patientRouter from "./modules/patient/patient.router.js"
import userRouter from "./modules/user/user.router.js"
import { AppError } from "./utils/AppError.js"
import express from 'express';


export function init(app) {
    app.get('/', (req, res) => res.json('Hello World!'))
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/medication', medicationRouter)
    app.use('/api/v1/mentors', mentorRouter)
    app.use('/api/v1/patients', patientRouter)
    app.use('/api/v1/chats', chatRouter)
    app.use('/api/v1/messages', messageRouter)
    app.use('/api/v1/activity', activityRouter)
    app.use('/api/v1/location', locationRouter)
    app.use(globalErrorMiddleware)
    app.all('*', (req, res, next) => {
        next(new AppError(`can't find this route : ${req.originalUrl}`, 404))
    })
}