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

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

router.patch(
  '/:contactId',
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactByIdController),
);

export default router;
