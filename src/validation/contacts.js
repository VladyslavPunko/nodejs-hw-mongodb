import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().required().min(2).max(20),
  phoneNumber: Joi.string().required().min(2).max(20),
  email: Joi.string().email().required().min(2).max(20),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string()
    .required()
    .valid('work', 'home', 'personel')
    .required(),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  phoneNumber: Joi.string().min(2).max(20),
  email: Joi.string().email().min(2).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personel'),
});
