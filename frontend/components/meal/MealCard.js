import Image from "next/image";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AccessTime from "@mui/icons-material/AccessTime";
import LocationOn from "@mui/icons-material/LocationOn";
import StarsIcon from "@mui/icons-material/Stars";
import Chip from "@mui/material/Chip";
import formatDate from "@/utils/formatDate.js";

export default function MealCard({ meal }) {
  const imageUrl = `/images/meals/${meal.image_url}` || "default.jpg";

  const getAvailableSpotsLabel = (availableSpots) => {
    if (availableSpots === 0) {
      return "Fully Booked";
    } else if (availableSpots < 5) {
      return `${availableSpots} spot${availableSpots > 1 ? "s" : ""} left`;
    } else if (availableSpots >= 5) {
      return "5+ spots available";
    }
    return null;
  };

  const availableSpotsLabel = getAvailableSpotsLabel(meal.available_spots);

  return (
    <Link
      href={`/meals/${meal.id}`}
      passHref
      style={{ textDecoration: "none", display: "block" }}
    >
      <Card
        sx={{
          width: 300,
          minHeight: 350,
          m: 2,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: 8,
          },
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia sx={{ position: "relative", height: 200, width: "100%" }}>
          <Image
            src={imageUrl}
            alt={`Photo of ${meal.title}`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            style={{ objectFit: "cover" }}
            priority
          />
          {availableSpotsLabel && (
            <Chip
              label={availableSpotsLabel}
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                zIndex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
            />
          )}
        </CardMedia>
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant='h6' component='h3' gutterBottom noWrap>
            {meal.title}
          </Typography>

          <Stack spacing={1}>
            <Box display='flex' alignItems='flex-end'>
              <LocationOn color={"primary"} sx={{ mr: 1, flexShrink: 0 }} />
              <Typography variant='body2' noWrap>
                {meal.location}
              </Typography>
            </Box>
            <Box display='flex' alignItems='flex-end'>
              <AccessTime color='primary' sx={{ mr: 1, flexShrink: 0 }} />
              <Typography variant='body2' noWrap>
                {formatDate(meal.scheduled_at)}
              </Typography>
            </Box>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Box display='flex' alignItems='flex-end'>
                <StarsIcon color='primary' sx={{ mr: 0.5, flexShrink: 0 }} />
                <Typography variant='body2'>
                  {meal.average_stars.toFixed(1)}
                </Typography>
              </Box>

              <Typography
                variant='subtitle1'
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                DKK {meal.price}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}
