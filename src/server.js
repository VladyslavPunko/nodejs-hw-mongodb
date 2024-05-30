import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utilits/env.js';
import studentsRouter from './routers/contacts.js';

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

  app.get(studentsRouter);

  app.use('*', (req, res) => {
    res.sendStatus(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
