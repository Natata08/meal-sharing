"use client";

import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import MealCard from "./MealCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { fetchMeals } from "@/utils/api";

export default function MealsList({ searchQuery }) {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchMeals()
      .then((data) => {
        setMeals(data);
        setFilteredMeals(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = meals.filter((meal) =>
        meal.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMeals(filtered);
    } else {
      setFilteredMeals(meals);
    }
  }, [searchQuery, meals]);

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='50vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth='md' sx={{ mt: 13 }}>
        <Alert severity='error'>
          {
            "We're having trouble loading the meals right now. Please try again later."
          }
        </Alert>
      </Container>
    );
  }

  if (filteredMeals.length === 0) {
    return (
      <Typography
        variant='h6'
        align='center'
        color='textSecondary'
        sx={{ mt: 4, mb: 4 }}
      >
        No meals found
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} justifyContent='center'>
      {filteredMeals.map((meal) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={`meal-${meal.id}`}>
          <MealCard meal={meal} />
        </Grid>
      ))}
    </Grid>
  );
}
