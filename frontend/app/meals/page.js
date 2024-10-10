import MealsList from "@/components/meal/MealsList";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import SearchField from "@/components/ui/SearchField";
import SortControls from "@/components/ui/SortControls";
import AvailabilityFilter from "@/components/ui/AvailabilityFilter";

export default async function MealsPage({ searchParams }) {
  const query = searchParams?.title || "";
  const sortKey = searchParams?.sortKey || "scheduled_at";
  const sortDir = searchParams?.sortDir || "asc";
  const availableReservations = searchParams?.availableReservations === "true";

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

        <Box
          sx={{
            mt: 4,
            mb: 4,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            rowGap: 2.5,
          }}
        >
          <SearchField />
          <SortControls />
          <AvailabilityFilter />
        </Box>
        <MealsList
          query={query}
          sortKey={sortKey}
          sortDir={sortDir}
          availableReservations={availableReservations}
        />
      </Container>
    </main>
  );
}
