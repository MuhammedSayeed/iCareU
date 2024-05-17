import express from 'express';
import * as dotenv from 'dotenv'
import { dbConnection } from './databases/dbConnection.js';
import userRouter from './src/modules/user/user.router.js';
import { globalErrorMiddleware } from './src/middleware/globalErrorMiddleware.js';
import { AppError } from './src/utils/AppError.js';
import medicationRouter from './src/modules/medication/medication.router.js';
import patientRouter from './src/modules/patient/patient.router.js';
import mentorRouter from './src/modules/mentor/mentor.router.js';
import chatRouter from './src/modules/chat/chat.router.js';
import messageRouter from './src/modules/message/message.router.js';
import cors from "cors"
import activityRouter from './src/modules/activity/activity.router.js';

dotenv.config()
const app = express();
const port = 3000;
dbConnection()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => res.json('Hello World!'))
app.use('/api/v1/users', userRouter)
app.use('/api/v1/medication', medicationRouter)
app.use('/api/v1/mentors', mentorRouter)
app.use('/api/v1/patients', patientRouter)
app.use('/api/v1/chats', chatRouter)
app.use('/api/v1/messages', messageRouter)
app.use('/api/v1/activity', activityRouter)

app.use(globalErrorMiddleware)
app.all('*', (req, res, next) => {
    next(new AppError(`can't find this route : ${req.originalUrl}`, 404))
})
app.listen(process.env.PORT || port, () => {
    console.log(`app is listening on ${port}`);
}) 

