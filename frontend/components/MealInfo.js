import Image from "next/image";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

export default function MealInfo({ meal }) {
  return (
    <Grid container spacing={4}>
      <Grid
        xs={12}
        md={6}
        sx={{ position: "relative", height: 500, width: "100%" }}
      >
        <Image
          src={meal.imageUrl || "/images/pancake.jpg"}
          alt={meal.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Grid>
      <Grid xs={12} md={6}>
        <Typography variant='h4' component='h2' gutterBottom>
          {meal.title}
        </Typography>
        <Typography variant='h5'>{meal.description}</Typography>
        <Typography variant='body2'>Location: {meal.location}</Typography>
        <Typography variant='body2'>
          Date: {new Date(meal.scheduled_at).toLocaleString()}
        </Typography>
        <Typography variant='body2'>Price: ${meal.price}</Typography>
        <Typography variant='body2'>
          Max Reservations: {meal.max_reservations}
        </Typography>
      </Grid>
    </Grid>
  );
}
