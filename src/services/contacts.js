import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contects = await ContactsCollection.find();
  return contects;
};

export const getContactById = async (contsciId) => {
  const contact = await ContactsCollection.findById(contsciId);
  return contact;
};
