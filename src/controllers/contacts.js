import { getAllContacts, getContactById } from '../services/contacts.js';

export const getStudentController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getStudentByIdController = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({
      message: `There is no contact with id ${contactId}`,
    });
  }

  res.status(200).json({
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};
