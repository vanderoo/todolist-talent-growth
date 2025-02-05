import Joi from 'joi';

export const createItemSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('pending', 'completed').default('pending'),
});

export const updateItemSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid('pending', 'completed'),
});
