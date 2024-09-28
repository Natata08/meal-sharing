"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid2";
import Meal from "./Meal";
import Link from "next/link";

export default function MealsList({ limit }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/meals`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }
        const data = await response.json();
        setMeals(limit ? data.slice(0, limit) : data);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setError(
          "We're having trouble loading the meals right now. Please update the page."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [limit]);

  if (loading) {
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
      <Container maxWidth='md' sx={{ mt: 4 }}>
        <Alert severity='error'>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} justifyContent='center'>
        {meals.map((meal) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={meal.id}>
            <Meal meal={meal} />
          </Grid>
        ))}
      </Grid>
      {limit && (
        <Box display='flex' justifyContent='center' mt={5}>
          <Link href='/meals' passHref>
            <Button variant='contained' color='primary'>
              Show all meals
            </Button>
          </Link>
        </Box>
      )}
    </Container>
  );
}
