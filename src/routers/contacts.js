import { Router } from 'express';
import {
  getStudentByIdController,
  getStudentController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getStudentController);

router.get('/contacts/:contactId', getStudentByIdController);

export default router;
