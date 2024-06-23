import { TEMPLATES_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utilits/createDirIfNotExists.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMPLATES_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};

bootstrap();
