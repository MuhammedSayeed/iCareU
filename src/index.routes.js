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


export function init(app) {
    const base = "/api/v1";
    app.get('/', (req, res) => res.json('Hello World!'))
    app.use(`${base}/users`, userRouter)
    app.use(`${base}/medication`, medicationRouter)
    app.use(`${base}/mentors`, mentorRouter)
    app.use(`${base}/patients`, patientRouter)
    app.use(`${base}/chats`, chatRouter)
    app.use(`${base}/messages`, messageRouter)
    app.use(`${base}/activity`, activityRouter)
    app.use(`${base}/location`, locationRouter)
    app.use(globalErrorMiddleware)
    app.all('*', (req, res, next) => {
        next(new AppError(`can't find this route : ${req.originalUrl}`, 404))
    })
}