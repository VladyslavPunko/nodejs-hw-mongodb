import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utilits/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
