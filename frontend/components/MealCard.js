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
import formatDate from "@/utils/formatDate.js";

export default function Meal({ meal }) {
  const imageUrl = `/images/meals/${meal.image_url}` || "default.jpg";

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
            <Box display='flex' alignItems='flex-end' justifyContent='flex-end'>
              <AttachMoney color='primary' sx={{ mr: 0.5, flexShrink: 0 }} />
              <Typography variant='body2'>Price: DKK {meal.price}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}
