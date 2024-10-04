import MealsList from "@/components/meal/MealsList";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function MealsPage() {
  return (
    <main>
      <Container maxWidth='lg' sx={{ mt: 13, mb: 6 }}>
        <Typography
          variant='h4'
          component='h2'
          gutterBottom
          align='center'
          color='primary'
        >
          All Meals
        </Typography>
        <MealsList />
      </Container>
    </main>
  );
}
