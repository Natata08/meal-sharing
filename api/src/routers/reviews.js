import express from "express";
import {
  reviewAddSchema,
  reviewUpdateSchema,
  validateRequest,
} from "../helper/validation.js";

import {
  getAllReviews,
  addNewReview,
  getReviewById,
  updateReviewById,
  deleteReviewById,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getAllReviews);
router.post("/", validateRequest(reviewAddSchema), addNewReview);
router.get("/:id", getReviewById);
router.put("/:id", validateRequest(reviewUpdateSchema), updateReviewById);
router.delete("/:id", deleteReviewById);

export default router;
