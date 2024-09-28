import MealsList from "@/components/MealsList";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <main>
      <Typography
        variant='h4'
        component='h2'
        gutterBottom
        textAlign='center'
        mt={5}
      >
        All available meals
      </Typography>
      <MealsList />
    </main>
  );
}
