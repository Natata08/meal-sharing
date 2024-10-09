"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const id = params.id;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    if (id) {
      fetchMeal(id, setMeal, setError, setLoading);
    }
  }, [id, refetchTrigger]);

  const handleReservationSubmit = async (reservationData) => {
    try {
      await makeReservation(reservationData);
      setSubmitMessage("Reservation submitted successfully!");
      setReservationModalOpen(false);
      setRefetchTrigger((prev) => prev + 1);
    } catch (err) {
      setSubmitMessage("Failed to make reservation. Please try again.");
      setReservationModalOpen(false);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      await submitReview(id, reviewData);
      setSubmitMessage("Review submitted successfully!");
      setReviewModalOpen(false);
      setRefetchTrigger((prev) => prev + 1);
    } catch (err) {
      setSubmitMessage("Failed to submit review. Please try again.");
      setReviewModalOpen(false);
    }
  };

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth='md' sx={{ mt: 13 }}>
        <Alert severity='error'>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='md' sx={{ mt: 13, mb: 6 }}>
      {meal && <MealInfo meal={meal} />}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
          flexWrap: "wrap",
        }}
      >
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
          color='primary'
          onClick={() => setReviewModalOpen(true)}
        >
          Write review
        </Button>
      </Box>

      <ReservationModal
        open={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        onSubmit={handleReservationSubmit}
        mealId={meal.id}
        available_spots={meal.available_reservations}
      />

      <ReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />

      {submitMessage && (
        <Alert
          severity={
            submitMessage.includes("successfully") ? "success" : "error"
          }
          onClose={() => setSubmitMessage(null)}
          sx={{ mt: 2 }}
        >
          {submitMessage}
        </Alert>
      )}
    </Container>
  );
}
