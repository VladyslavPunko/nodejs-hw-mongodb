import { Router } from 'express';
import {
  createContactController,
  getContactsByIdController,
  getContactsController,
  deleteContactByIdController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utilits/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactByIdController));

export default router;
