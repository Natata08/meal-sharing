import MealsList from "@/components/meal/MealsList";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import SearchField from "@/components/ui/SearchField";

export default async function MealsPage({ searchParams }) {
  const query = searchParams?.title || "";

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

        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <SearchField />
        </Box>

        <MealsList query={query} />
      </Container>
    </main>
  );
}
