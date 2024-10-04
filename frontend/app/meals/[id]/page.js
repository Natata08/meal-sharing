"use client";

import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import MealInfo from "@/components/meal/MealInfo";
import ReservationModal from "@/components/ReservationModal";
import ReviewModal from "@/components/ReviewModal";
import { fetchMeal, makeReservation, submitReview } from "@/utils/api";

export default function MealDetailsPage({ params }) {
  const id = params.id;
  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  useEffect(() => {
    if (id) {
      fetchMeal(id, setMeal, setError, setLoading);
    }
  }, [id]);

  const handleReservationSubmit = async (reservationData) => {
    try {
      await makeReservation(reservationData);
      setSubmitMessage("Reservation successful!");
      setReservationModalOpen(false);
    } catch (err) {
      setSubmitMessage("Failed to make reservation. Please try again.");
    }
    revalidatePath(`/meals/${id}`);
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      await submitReview(id, reviewData);
      setSubmitMessage("Review submitted successfully!");
      setReviewModalOpen(false);
    } catch (err) {
      setSubmitMessage("Failed to submit review. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='50vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth='md' sx={{ mt: 4 }}>
        <Alert severity='error'>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='md' sx={{ mt: 13, mb: 6 }}>
      <MealInfo meal={meal} />
      <Box mt={2}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setReservationModalOpen(true)}
          disabled={meal.available_reservations <= 0}
        >
          Book seat
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => setReviewModalOpen(true)}
          sx={{ ml: 2 }}
        >
          Write review
        </Button>
      </Box>

      <ReservationModal
        open={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        onSubmit={handleReservationSubmit}
        mealId={meal.id}
      />

      <ReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />

      {submitMessage && (
        <Alert
          severity={submitMessage.includes("successful") ? "success" : "error"}
          onClose={() => setSubmitMessage(null)}
        >
          {submitMessage}
        </Alert>
      )}
    </Container>
  );
}
