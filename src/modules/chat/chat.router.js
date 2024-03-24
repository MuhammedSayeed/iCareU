import express from 'express';
import { protectedRoutes } from '../user/user.controller.js';
import * as chatController from './chat.controller.js'
import { validation } from '../../middleware/validation.js';
import { idSchema } from '../../global/validationSchema.js';
import { careRealationshipChecking } from '../../middleware/checking.Middleware.js';

const chatRouter = express.Router();

chatRouter.post('/create-chat', protectedRoutes, careRealationshipChecking(), validation(idSchema), chatController.createChat)
chatRouter.get('/user-chats', protectedRoutes, chatController.userChats)


export default chatRouter

