const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const fetchMeal = async (id, setMeal, setError, setLoading) => {
//   try {
//     const [mealResponse, availableMealsResponse] = await Promise.all([
//       fetch(`${API_URL}/meals/${id}`),
//       fetch(`${API_URL}/meals?availableReservations=true`),
//     ]);
//     if (!mealResponse.ok || !availableMealsResponse.ok)
//       throw new Error("Failed to fetch data");
//     const mealData = await mealResponse.json();
//     const availableMeals = await availableMealsResponse.json();
//     setMeal({
//       ...mealData,
//       available_reservations: availableMeals.some((m) => m.id === parseInt(id)),
//     });
//   } catch (err) {
//     setError(
//       "We're having trouble loading the meal details right now. Please try again later."
//     );
//   } finally {
//     setLoading(false);
//   }
// };

export const fetchMeal = async (id, setMeal, setError, setLoading) => {
  try {
    const [mealResponse, reviewsResponse, availableMealsResponse] =
      await Promise.all([
        fetch(`${API_URL}/meals/${id}`),
        fetch(`${API_URL}/meals/${id}/reviews`),
        fetch(`${API_URL}/reservations`),
      ]);
    if (!mealResponse.ok || !reviewsResponse.ok || !availableMealsResponse.ok)
      throw new Error("Failed to fetch data");
    const mealData = await mealResponse.json();
    const reviewsData = await reviewsResponse.json();
    const reservations = await availableMealsResponse.json();
    const totalReserved = reservations.reduce((acc, reservation) => {
      if (reservation.meal_id === parseInt(id)) {
        return acc + reservation.number_of_guests;
      }
      return acc;
    }, 0);

    const available_reservations =
      parseInt(mealData.max_reservations) - totalReserved;
    setMeal({
      ...mealData,
      reviews: reviewsData,
      available_reservations: available_reservations,
    });
  } catch (err) {
    setError(
      "We're having trouble loading the meal details right now. Please try again later."
    );
  } finally {
    setLoading(false);
  }
};

export const makeReservation = async (reservationData) => {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservationData),
  });
  if (!response.ok) throw new Error("Failed to make reservation");
  return response.json();
};

export const submitReview = async (id, reviewData) => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...reviewData, meal_id: id }),
  });
  if (!response.ok) throw new Error("Failed to submit review");
  return response.json();
};
