import express from 'express';
import { protectedRoutes } from '../user/user.controller.js';
import * as controller from './message.controller.js'
import { validation } from '../../middleware/validation.js';
import { messageSchema } from '../../validations/message.js';
import { idSchema } from '../../validations/global.js';
import { chatChecking } from '../../middleware/checking.js';

const messageRouter = express.Router();

messageRouter.route('/send-message').post(protectedRoutes, validation(messageSchema), chatChecking, controller.sendMessage)
messageRouter.route('/all-chat-messages').get(protectedRoutes, validation(idSchema), controller.allMessageOfChat)
export default messageRouter
