import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import MealCard from "./MealCard";
import { fetchMeals } from "@/utils/api";

export default async function MealsList({ query }) {
  const meals = await fetchMeals(query);

  if (meals.length === 0) {
    return (
      <Typography
        variant='h6'
        align='center'
        color='textSecondary'
        sx={{ mt: 4, mb: 4 }}
      >
        No meals found
      </Typography>
    );
  }

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
