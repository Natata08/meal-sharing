import express from 'express';
import {
  mealAddSchema,
  validateRequest,
  mealUpdateSchema,
} from '../helper/validation.js';

import {
  getAllMeals,
  addNewMeal,
  getMealById,
  updateMealById,
  deleteMealById,
  getFutureMeals,
  getPastMeals,
  getFirstMeal,
  getLastMeal,
} from '../controllers/mealController.js';

const router = express.Router();

router.get('/future-meals', getFutureMeals);
router.get('/past-meals', getPastMeals);
router.get('/first-meal', getFirstMeal);
router.get('/last-meal', getLastMeal);

router.get('/', getAllMeals);
router.post('/', validateRequest(mealAddSchema), addNewMeal);
router.get('/:id', getMealById);
router.put('/:id', validateRequest(mealUpdateSchema), updateMealById);
router.delete('/:id', deleteMealById);

export default router;
