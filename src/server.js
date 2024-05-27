import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utilits/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const contactId = req.params.contactId;
    try {
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
    } catch (error) {
      return res.status(404).json({
        message: `There is no contact with id ${contactId}`,
      });
    }
  });

  app.use('*', (req, res) => {
    res.sendStatus(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
