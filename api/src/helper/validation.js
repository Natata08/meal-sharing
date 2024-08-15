import Joi from 'joi';

export const mealAddSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  location: Joi.string().required(),
  scheduled_at: Joi.date().iso().required(),
  max_reservations: Joi.number().integer().required(),
  price: Joi.number().precision(2).positive().required(),
});

export const mealUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow('').allow(null),
  location: Joi.string(),
  scheduled_at: Joi.date().iso(),
  max_reservations: Joi.number().integer(),
  price: Joi.number().precision(2).positive(),
}).min(1);

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    if (!req.value) {
      req.value = {};
    }
    req.value['body'] = value;
    next();
  };
};
