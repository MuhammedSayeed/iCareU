import express from 'express';
import * as controller from './medication.controller.js'
import { allowedTo, protectedRoutes } from '../user/user.controller.js';
import { addMedicationSchema, updateMedicationSchema } from '../../validations/medication.js';
import { validation } from '../../middleware/validation.js';
import { careRealationshipChecking } from '../../middleware/checking.js';

const medicationRouter = express.Router();
medicationRouter.get('/:id', protectedRoutes, allowedTo('mentor', 'patient'), careRealationshipChecking(), controller.getMedication)
medicationRouter.get('/all/:patient', protectedRoutes, allowedTo('mentor', 'patient'), careRealationshipChecking(true), controller.getAllMedications)
medicationRouter.post('/', protectedRoutes, allowedTo('mentor'), validation(addMedicationSchema), careRealationshipChecking(), controller.addMedication)
medicationRouter.put('/:id', protectedRoutes, allowedTo('mentor'), validation(updateMedicationSchema), careRealationshipChecking(), controller.updateMedication)
medicationRouter.delete('/:id', protectedRoutes, allowedTo('mentor'), careRealationshipChecking(), controller.removeMedication)

export default medicationRouter;