import express from 'express';
import {
  reservationAddSchema,
  reservationUpdateSchema,
  validateRequest,
} from '../helper/validation.js';

import {
  getAllReservations,
  addNewReservation,
  getReservationById,
  updateReservationById,
  deleteReservationById,
} from '../controllers/reservationController.js';

const router = express.Router();

router.get('/', getAllReservations);
router.post('/', validateRequest(reservationAddSchema), addNewReservation);
router.get('/:id', getReservationById);
router.put(
  '/:id',
  validateRequest(reservationUpdateSchema),
  updateReservationById
);
router.delete('/:id', deleteReservationById);

export default router;
