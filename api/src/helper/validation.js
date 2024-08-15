import Joi from 'joi';

const mealSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  location: Joi.string().required(),
  scheduled_at: Joi.date().iso().required(),
  max_reservations: Joi.number().integer().required(),
  price: Joi.number().precision(2).positive().required(),
});

export const validateNewMeal = (req, res, next) => {
  const { error } = mealSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
