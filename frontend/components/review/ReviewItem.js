import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Rating from "@mui/material/Rating";

export default function ReviewItem({ review }) {
  return (
    <ListItem alignItems='flex-start'>
      <ListItemText
        primary={
          <Typography
            variant='h6'
            component='h4'
            sx={{ display: "flex", alignItems: "center" }}
          >
            {review.title ?? "No title"}
            <Rating value={review.stars} readOnly size='small' sx={{ ml: 1 }} />
          </Typography>
        }
        secondary={
          <>
            <Typography component='span' variant='body2' color='text.primary'>
              {review.description}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}
