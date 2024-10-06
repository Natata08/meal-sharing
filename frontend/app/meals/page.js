"use client";

import { useState } from "react";
import MealsList from "@/components/meal/MealsList";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";

export default function MealsPage() {
  const [searchQuery, setSearchQuery] = useState("");

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

        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <TextField
            size='small'
            label='Search meals'
            variant='outlined'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mr: 2, width: "250px" }}
          />
        </Box>

        <MealsList searchQuery={searchQuery} />
      </Container>
    </main>
  );
}
