import express from 'express';
import * as controller from './location.controller.js'
import { allowedTo, protectedRoutes } from '../user/user.controller.js';
import { careRealationshipChecking } from '../../middleware/checking.js';

const locationRouter = express.Router();
locationRouter.get('/:patient', protectedRoutes, allowedTo('mentor'), careRealationshipChecking(true), controller.getLocationOfPatient)
locationRouter.put('/update-location', protectedRoutes, allowedTo('patient'), controller.updateLocation)


export default locationRouter;