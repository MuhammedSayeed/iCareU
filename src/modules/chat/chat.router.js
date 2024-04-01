import express from 'express';
import { protectedRoutes } from '../user/user.controller.js';
import * as controller from './chat.controller.js'
import { validation } from '../../middleware/validation.js';
import { idSchema } from '../../validations/global.js';
import { careRealationshipChecking } from '../../middleware/checking.js';

const chatRouter = express.Router();

chatRouter.post('/create-chat', protectedRoutes, careRealationshipChecking(), validation(idSchema), controller.createChat)
chatRouter.get('/user-chats', protectedRoutes, controller.userChats)


export default chatRouter

