import express from "express";
import {
  mealAddSchema,
  mealUpdateSchema,
  validateRequest,
} from "../helper/validation.js";

import {
  getMealsWithQueries,
  addNewMeal,
  getMealById,
  updateMealById,
  deleteMealById,
  getFutureMeals,
  getPastMeals,
  getFirstMeal,
  getLastMeal,
  getReviewsForMeal,
} from "../controllers/mealController.js";

const router = express.Router();

router.get("/future-meals", getFutureMeals);
router.get("/past-meals", getPastMeals);
router.get("/first-meal", getFirstMeal);
router.get("/last-meal", getLastMeal);

router.get("/", getMealsWithQueries);
router.post("/", validateRequest(mealAddSchema), addNewMeal);
router.get("/:id", getMealById);
router.get("/:meal_id/reviews", getReviewsForMeal);
router.put("/:id", validateRequest(mealUpdateSchema), updateMealById);
router.delete("/:id", deleteMealById);

export default router;
