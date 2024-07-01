import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utilits/env.js';
import router from './routers/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

import coockieParse from 'cookie-parser';

import { swaggerDocs } from './middleware/swaggerDocs.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use('/api-docs', swaggerDocs());

  app.use(express.json());
  app.use(cors());

  app.use(coockieParse());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
