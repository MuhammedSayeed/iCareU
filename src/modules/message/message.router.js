import express from 'express';
import { protectedRoutes } from '../user/user.controller.js';
import * as messageController from './message.controller.js'
import { validation } from '../../middleware/validation.js';
import { messageSchema } from './message.validation.js';
import { chatChecking } from '../../middleware/message.middleware.js';
import { idSchema } from '../../global/validationSchema.js';

const messageRouter = express.Router();

messageRouter.route('/send-message').post(protectedRoutes, validation(messageSchema), chatChecking, messageController.sendMessage)
messageRouter.route('/all-chat-messages').get(protectedRoutes, validation(idSchema), messageController.allMessageOfChat)
export default messageRouter
