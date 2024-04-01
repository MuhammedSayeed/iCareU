import express from 'express';
import * as controller from './medication.controller.js'
import { allowedTo, protectedRoutes } from '../user/user.controller.js';
import { addMedicationSchema, updateMedicationSchema } from '../../validations/medication.js';
import { validation } from '../../middleware/validation.js';
import { careRealationshipChecking } from '../../middleware/checking.js';

const medicationRouter = express.Router();
medicationRouter.get('/:id', protectedRoutes, allowedTo('mentor', 'patient'), careRealationshipChecking(), controller.getMedication)
medicationRouter.get('/all/:patient', protectedRoutes, careRealationshipChecking(true), controller.getAllMedications)
medicationRouter.post('/', protectedRoutes, allowedTo('mentor'), careRealationshipChecking(), validation(addMedicationSchema), controller.addMedication)
medicationRouter.put('/:id', protectedRoutes, allowedTo('mentor'), careRealationshipChecking(), validation(updateMedicationSchema), controller.updateMedication)
medicationRouter.delete('/:id', protectedRoutes, allowedTo('mentor'), careRealationshipChecking(), controller.removeMedication)

export default medicationRouter;