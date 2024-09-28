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
import AttachMoney from "@mui/icons-material/AttachMoney";

const randomImages = [
  "/images/caesar.jpg",
  "/images/pancake.jpg",
  "/images/ribs.jpg",
  "/images/salad.jpg",
  "/images/steak.jpg",
];

export default function Meal({ meal }) {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    return randomImages[randomIndex];
  };

  const imageUrl = meal.imageUrl || getRandomImage();

  return (
    <Link
      href={`/meals/${meal.id}`}
      passHref
      style={{ textDecoration: "none", display: "block" }}
    >
      <Card
        sx={{
          width: 300,
          height: 400,
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
            alt={meal.title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            style={{ objectFit: "cover" }}
            priority
          />
        </CardMedia>
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 200,
          }}
        >
          <Typography variant='h6' component='h3' gutterBottom noWrap>
            {meal.title}
          </Typography>

          <Stack spacing={2}>
            <Box display='flex' alignItems='center'>
              <LocationOn color='action' sx={{ mr: 1, flexShrink: 0 }} />
              <Typography variant='body2' noWrap>
                {meal.location}
              </Typography>
            </Box>
            <Box display='flex' alignItems='center'>
              <AccessTime color='action' sx={{ mr: 1, flexShrink: 0 }} />
              <Typography variant='body2' noWrap>
                {formatDate(meal.scheduled_at)}
              </Typography>
            </Box>
            <Box display='flex' alignItems='center' justifyContent='flex-end'>
              <AttachMoney color='action' sx={{ mr: 0.5, flexShrink: 0 }} />
              <Typography variant='body2'>Price: ${meal.price}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}
