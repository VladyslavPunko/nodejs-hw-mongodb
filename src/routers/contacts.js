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
import { authenticate } from '../middleware/authenticate.js';

import { upload } from '../middleware/multer.js';

const router = Router();

router.use('/', authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

router.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactByIdController),
);

export default router;
