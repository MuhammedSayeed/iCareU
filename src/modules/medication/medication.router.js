import express from 'express';
import * as medicationController from './medication.controller.js'
import { allowedTo, protectedRoutes } from '../user/user.controller.js';
import { addMedicationSchema, updateMedicationSchema } from './medication.validation.js';
import { validation } from '../../middleware/validation.js';
import { careRealationshipChecking } from '../../middleware/checking.Middleware.js';

const medicationRouter = express.Router();
medicationRouter.get('/:id', protectedRoutes, allowedTo('mentor', 'patient'), careRealationshipChecking(), medicationController.getMedication)
medicationRouter.get('/all/:patient', protectedRoutes, careRealationshipChecking(true), medicationController.getAllMedications)
medicationRouter.post('/', protectedRoutes, allowedTo('mentor'), careRealationshipChecking(), validation(addMedicationSchema), medicationController.addMedication)
medicationRouter.put('/:id', protectedRoutes, allowedTo('mentor'), careRealationshipChecking(), validation(updateMedicationSchema), medicationController.updateMedication)
medicationRouter.delete('/:id', protectedRoutes, allowedTo('mentor'), careRealationshipChecking(), medicationController.removeMedication)

export default medicationRouter;