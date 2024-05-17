import express from 'express';
import { allowedTo, protectedRoutes } from '../user/user.controller.js';
import * as controller from './activity.controller.js'
import { fetchPredictions } from '../../middleware/fetchPredictions.js';


const activityRouter = express.Router();

activityRouter.patch('/', protectedRoutes, allowedTo("patient"), fetchPredictions(), controller.updateActivity)
activityRouter.get('/patients-activities', protectedRoutes, allowedTo("mentor"), controller.getPatientsActivities)


export default activityRouter

