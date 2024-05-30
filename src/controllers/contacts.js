import { getAllContacts, getContactById } from '../services/contacts.js';
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
