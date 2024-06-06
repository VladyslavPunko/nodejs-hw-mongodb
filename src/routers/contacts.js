import { Router } from 'express';
import {
  createContactController,
  getContactsByIdController,
  getContactsController,
  deleteContactByIdController,
  patchContactByIdController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utilits/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';

import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

router.post(
  '/contacts',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactByIdController));

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactByIdController),
);

export default router;
