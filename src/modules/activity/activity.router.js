import express from 'express';
import { protectedRoutes } from '../user/user.controller.js';
import * as controller from './activity.controller.js'
import { validation } from '../../middleware/validation.js';

const activityRouter = express.Router();

activityRouter.patch('/', protectedRoutes, careRealationshipChecking(), controller.updateActivity)
activityRouter.get('/user-chats', protectedRoutes, controller.userChats)


export default activityRouter

