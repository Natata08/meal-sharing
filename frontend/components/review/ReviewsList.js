import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ReviewItem from "./ReviewItem";

export default function ReviewsList({ reviews }) {
  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <>
      <Box mt={2}>
        <Button
          onClick={toggleReviews}
          endIcon={showReviews ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {showReviews ? "Hide Reviews" : "Show Reviews"}
        </Button>
      </Box>

      <Collapse in={showReviews}>
        <List>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewItem key={`reviewItem-${index}`} review={review} />
            ))
          ) : (
            <ListItem>
              <ListItemText primary='No reviews yet.' />
            </ListItem>
          )}
        </List>
      </Collapse>
    </>
  );
}
