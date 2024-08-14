import express from 'express';

import {
  getAllMeals,
  addNewMeal,
  getMealById,
  updateMealById,
  getFutureMeals,
  getPastMeals,
  getFirstMeal,
  getLastMeal,
} from '../controllers/mealController.js';

const router = express.Router();

router.get('/', getAllMeals);
router.post('/', addNewMeal);
router.get('/:id', getMealById);
router.put('/:id', updateMealById);
router.get('/future-meals', getFutureMeals);
router.get('/past-meals', getPastMeals);

router.get('/first-meal', getFirstMeal);
router.get('/last-meal', getLastMeal);

router.get('/last-meal', getLastMeal);

export default router;
