const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchMeals = async (
  query = "",
  sortKey = "scheduled_at",
  sortDir = "asc",
  availableReservations = false
) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/meals/summary`);

  if (query) {
    url.searchParams.append("title", query);
  }

  if (availableReservations) {
    url.searchParams.append("availableReservations", "true");
  }

  url.searchParams.append("sortKey", sortKey);
  url.searchParams.append("sortDir", sortDir);

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  return response.json();
};

export const fetchMeal = async (id, setMeal, setError, setLoading) => {
  try {
    const [mealResponse, reviewsResponse, reservationsResponse] =
      await Promise.all([
        fetch(`${API_URL}/meals/${id}`),
        fetch(`${API_URL}/meals/${id}/reviews`),
        fetch(`${API_URL}/meals/${id}/reservations`),
      ]);

    if (mealResponse.status === 404) {
      setMeal(null);
      return;
    }

    if (!mealResponse.ok || !reviewsResponse.ok || !reservationsResponse.ok)
      throw new Error("Failed to fetch information about this meal");

    const mealData = await mealResponse.json();
    const reviewsData = await reviewsResponse.json();
    const reservationsData = await reservationsResponse.json();

    const totalReserved = reservationsData.reduce(
      (acc, reservation) => acc + reservation.number_of_guests,
      0
    );

    const available_reservations =
      parseInt(mealData.max_reservations) - totalReserved;

    const averageStars = reviewsData.length
      ? parseFloat(
          (
            reviewsData.reduce((acc, review) => acc + review.stars, 0) /
            reviewsData.length
          ).toFixed(1)
        )
      : 0;

    setMeal({
      ...mealData,
      reviews: reviewsData,
      available_reservations: available_reservations,
      averageStars,
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
