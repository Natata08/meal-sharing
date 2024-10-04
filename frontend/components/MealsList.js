import Grid from "@mui/material/Grid2";
import MealCard from "./MealCard";

async function fetchMeals() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/meals/summary`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  const data = await response.json();
  return data;
}

export default async function MealsList() {
  const meals = await fetchMeals();

  return (
    <Grid container spacing={3} justifyContent='center'>
      {meals.map((meal) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={`meal-${meal.id}`}>
          <MealCard meal={meal} />
        </Grid>
      ))}
    </Grid>
  );
}
