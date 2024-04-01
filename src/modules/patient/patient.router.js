import express from 'express';
import { allowedTo, protectedRoutes } from '../user/user.controller.js';
import * as controller from './patient.controller.js'
import { validation } from '../../middleware/validation.js';
import { idSchema } from '../../validations/global.js';
const patientRouter = express.Router();

patientRouter.post('/confirm/:id', protectedRoutes, allowedTo('patient'), validation(idSchema), controller.confirmCare)
patientRouter.patch('/decline/:id', protectedRoutes, allowedTo('patient'), validation(idSchema), controller.declineCare)
patientRouter.get('/all-requests', protectedRoutes, allowedTo('patient'), controller.pateintRequests)



export default patientRouter; 