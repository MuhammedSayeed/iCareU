import express from 'express';
import { allowedTo, protectedRoutes } from '../user/user.controller.js';
import * as controller from './mentor.controller.js'
import { requestChecking } from '../../middleware/checking.js';
const mentorRouter = express.Router();

mentorRouter.post('/', protectedRoutes, allowedTo('mentor'), requestChecking, controller.addPatient)
mentorRouter.delete('/:id', protectedRoutes, allowedTo('mentor'), controller.removePatient)
mentorRouter.get('/allPatients', protectedRoutes, controller.getPatients)


export default mentorRouter;