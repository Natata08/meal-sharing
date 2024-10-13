import Image from "next/image";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import ReviewsList from "../review/ReviewsList";
import StarsIcon from "@mui/icons-material/Stars";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import formatDate from "@/utils/formatDate";

export default function MealInfo({ meal }) {
  const imageUrl = meal.image_url
    ? `/images/meals/${meal.image_url}`
    : "/images/meals/default.jpg";

  return (
    <Grid container spacing={4} mb={3}>
      <Grid
        xs={12}
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "300px", sm: "400px", md: "500px" },
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
          mb: 2,
        }}
      >
        <Image
          src={imageUrl}
          alt={meal.title}
          fill
          style={{ objectFit: "cover" }}
          sizes='(max-width: 768px) 100vw, 50vw'
          priority
        />
      </Grid>
      <Grid xs={12} width='100%'>
        <Box
          display='flex'
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent='space-between'
          alignItems={{ xs: "flex-start", sm: "center" }}
          mb={3}
        >
          <Typography
            variant='h4'
            component='h3'
            sx={{ fontWeight: "bold", mb: { xs: 1, sm: 0 } }}
          >
            {meal.title}
          </Typography>
          <Box textAlign={{ xs: "left", sm: "right" }}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent={{ xs: "flex-start", sm: "flex-end" }}
            >
              <StarsIcon sx={{ color: "secondary.main", mr: 1, mb: 0.5 }} />
              <Typography variant='h6' component='span'>
                {meal.averageStars.toFixed(1)}/5.0
              </Typography>
            </Box>
            <Chip
              label={`${meal.reviews.length} review${
                meal.reviews.length === 1 ? "" : "s"
              }`}
              size='small'
              sx={{ mt: 0.5 }}
            />
          </Box>
        </Box>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant='body1' sx={{ fontStyle: "italic" }}>
            &quot;{meal.description}&quot;
          </Typography>
        </Paper>

        <Box
          display='flex'
          flexDirection='column'
          gap={2}
          flexWrap='wrap'
          justifyContent='space-between'
          alignItems={{ xs: "flex-start", sm: "center" }}
          mb={3}
        >
          <Box
            display='flex'
            flexDirection={{ xs: "column", sm: "row" }}
            flexWrap='wrap'
            justifyContent='space-between'
            gap={2}
            width='100%'
          >
            <Box display='flex' alignItems='flex-end'>
              <LocationOnIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant='body1'>{meal.location}</Typography>
            </Box>
            <Box display='flex' alignItems='flex-end'>
              <CalendarTodayIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant='body1'>
                {formatDate(meal.scheduled_at)}
              </Typography>
            </Box>
          </Box>

          <Box
            display='flex'
            flexDirection={{ xs: "column", sm: "row" }}
            flexWrap='wrap'
            justifyContent='space-between'
            gap={2}
            width='100%'
          >
            <Box display='flex' alignItems='flex-end' mb={2}>
              <PeopleIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant='body1'>
                {meal.available_reservations} spots left out of{" "}
                {meal.max_reservations}
              </Typography>
            </Box>
            <Box mb={2}>
              <Typography variant='h5' fontWeight='bold' color='primary.main'>
                DKK {meal.price}
              </Typography>
            </Box>
          </Box>
        </Box>

        <ReviewsList reviews={meal.reviews} />
      </Grid>
    </Grid>
  );
}
