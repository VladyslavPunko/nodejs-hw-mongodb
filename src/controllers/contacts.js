import {
  createContact,
  deletContactById,
  getAllContacts,
  getContactById,
  upsertContactById,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { body } = req;
  const contact = await createContact(body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  await deletContactById(contactId);

  res.status(204).send();
};

export const patchContactByIdController = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const contact = await upsertContactById(contactId, body);

  res.status(200).json({
    staus: 200,
    message: `uccessfully patched a contact!`,
    data: contact,
  });
};
