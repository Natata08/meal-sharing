import slugify from "slugify";
import { S3 } from "@aws-sdk/client-s3";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const s3 = new S3({
  region: "eu-north-1",
});

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
    const mealResponse = await fetch(`${API_URL}/meals/${id}`);

    if (mealResponse.status === 404) {
      setMeal(null);
      return;
    }

    if (!mealResponse.ok) {
      throw new Error("Failed to fetch meal information");
    }

    const mealData = await mealResponse.json();

    const reviewsResponse = await fetch(`${API_URL}/meals/${id}/reviews`);
    if (!reviewsResponse.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviewsData = await reviewsResponse.json();

    const reservationsResponse = await fetch(
      `${API_URL}/meals/${id}/reservations`
    );
    if (!reservationsResponse.ok) {
      throw new Error("Failed to fetch reservations");
    }
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
  if (!response.ok) throw new Error("Failed to make a reservation");
  return response.json();
};

export const submitReview = async (id, reviewData) => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...reviewData, meal_id: id }),
  });
  if (!response.ok) throw new Error("Failed to submit a review");

  return response.json();
};

export const saveMeal = async (meal) => {
  const imageNameSlug = slugify(meal.title, { lower: true });
  const extension = meal.image_url.name.split(".").pop();
  const fileName = `${imageNameSlug}.${extension}`;

  const bufferedImage = await meal.image_url.arrayBuffer();

  s3.putObject({
    Bucket: "nat-meal-sharing-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image_url.type,
  });

  const response = await fetch(`${API_URL}/meals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...meal, image_url: fileName }),
  });
  if (!response.ok) {
    throw new Error(`Failed to save a meal`);
  }

  return response.json();
};
