import express from 'express';
import { allowedTo, protectedRoutes } from '../user/user.controller.js';
import * as patientController from './patient.controller.js'
import { validation } from '../../middleware/validation.js';
import { idSchema } from '../../global/validationSchema.js';
const patientRouter = express.Router();

patientRouter.post('/confirm/:id', protectedRoutes, allowedTo('patient'), validation(idSchema), patientController.confirmCare)
patientRouter.patch('/decline/:id', protectedRoutes, allowedTo('patient'), validation(idSchema), patientController.declineCare)
patientRouter.get('/all-requests', protectedRoutes, allowedTo('patient'), patientController.pateintRequests)



export default patientRouter; 