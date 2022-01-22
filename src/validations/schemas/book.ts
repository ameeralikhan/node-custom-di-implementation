import * as Joi from 'joi';

export const bookRequest = Joi.object({
  name: Joi.string().required(),
});
