import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contects = await ContactsCollection.find();
  return contects;
};

export const getContactById = async (contsciId) => {
  const contact = await ContactsCollection.findById(contsciId);
  return contact;
};

export const createContact = async (payload) => {
  const cotact = await ContactsCollection.create(payload);
  return cotact;
};

export const deletContactById = async (contsciId) => {
  await ContactsCollection.findByIdAndDelete(contsciId);
};

export const upsertContactById = async (contsciId, payload) => {
  const contact = await ContactsCollection.findByIdAndUpdate(
    contsciId,
    payload,
    {
      new: true,
    },
  );

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};
