import express from 'express';
import { allowedTo, protectedRoutes } from '../user/user.controller.js';
import * as mentorController from './mentor.controller.js'
import { requestChecking } from '../../middleware/Request.Middleware.js';
const requestRouter = express.Router();

requestRouter.post('/', protectedRoutes, allowedTo('mentor'), requestChecking, mentorController.addPatient)
requestRouter.delete('/:id', protectedRoutes, allowedTo('mentor'), mentorController.removePatient)
requestRouter.get('/allPatients', protectedRoutes, mentorController.getPatients)


export default requestRouter;