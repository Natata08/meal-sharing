import Joi from "joi";

export const mealAddSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional().allow("").allow(null),
  location: Joi.string().required(),
  scheduled_at: Joi.date().iso().required(),
  max_reservations: Joi.number().integer().required(),
  price: Joi.number().precision(2).positive().required(),
});

export const mealUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow("").allow(null),
  location: Joi.string(),
  scheduled_at: Joi.date().iso(),
  max_reservations: Joi.number().integer(),
  price: Joi.number().precision(2).positive(),
}).min(1);

export const reservationAddSchema = Joi.object({
  number_of_guests: Joi.number().integer().min(1).required(),
  meal_id: Joi.number().integer().required(),
  contact_phonenumber: Joi.string().optional().allow("").allow(null),
  contact_name: Joi.string().required(),
  contact_email: Joi.string().email().optional().allow("").allow(null),
});

export const reservationUpdateSchema = Joi.object({
  number_of_guests: Joi.number().integer().min(1),
  meal_id: Joi.number().integer(),
  contact_phonenumber: Joi.string().allow("").allow(null),
  contact_name: Joi.string(),
  contact_email: Joi.string().email().allow("").allow(null),
}).min(1);

export const reviewAddSchema = Joi.object({
  title: Joi.string().optional().allow("").allow(null),
  description: Joi.string().optional().allow("").allow(null),
  meal_id: Joi.number().integer().required(),
  stars: Joi.number().integer().min(1).max(5).required(),
});

export const reviewUpdateSchema = Joi.object({
  title: Joi.string().allow("").allow(null),
  description: Joi.string().allow("").allow(null),
  meal_id: Joi.number().integer(),
  stars: Joi.number().integer().min(1).max(5),
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

    req.value["body"] = value;
    next();
  };
};
