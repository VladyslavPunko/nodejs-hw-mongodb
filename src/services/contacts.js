import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utilits/calculatePaginationData.js';

import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  contactsQuery.where('userId').equals(userId);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contsctId, userId) => {
  const contact = await ContactsCollection.findById({ _id: contsctId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const cotact = await ContactsCollection.create(payload);
  return cotact;
};

export const deletContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  await ContactsCollection.deleteOne({ _id: contactId });

  return contact;
};

export const upsertContactById = async (contsctId, payload, userId) => {
  const contact = await ContactsCollection.findByIdAndUpdate(
    { _id: contsctId, userId },
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
