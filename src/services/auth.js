import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};
