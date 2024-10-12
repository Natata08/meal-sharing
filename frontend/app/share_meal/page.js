"use client";

import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import ImagePicker from "@/components/ui/image-picker";

export default function ShareMealPage() {
  const [mealData, setMealData] = useState({
    title: "",
    description: "",
    location: "",
    scheduled_at: "",
    max_reservations: "",
    price: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMealData({ ...mealData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setMealData({ ...mealData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mealData);
  };

  return (
    <main>
      <Container maxWidth='md' sx={{ mt: 13, mb: 6 }}>
        <Box sx={{ my: 4 }}>
          <Typography
            variant='h4'
            component='h2'
            gutterBottom
            align='center'
            color='primary'
          >
            Share Your Culinary Masterpiece
          </Typography>
          <Typography variant='body1' align='center'>
            Join our vibrant community of food lovers! By sharing your meal,
            you&apos;re not just offering food—you&apos;re fostering
            connections, sharing cultures, and uniting people. Let&apos;s make
            the world smaller and tastier, one shared meal at a time.
          </Typography>
        </Box>
        <Container maxWidth='sm' mb={10}>
          <Paper elevation={4} sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label='Meal Title'
                name='title'
                value={mealData.title}
                onChange={handleInputChange}
                margin='normal'
                size='small'
                required
              />
              <TextField
                fullWidth
                label='Description'
                name='description'
                value={mealData.description}
                onChange={handleInputChange}
                margin='normal'
                multiline
                rows={4}
                size='small'
                required
              />
              <TextField
                fullWidth
                label='Location'
                name='location'
                value={mealData.location}
                onChange={handleInputChange}
                margin='normal'
                size='small'
                required
              />
              <TextField
                fullWidth
                label='Date and Time'
                name='scheduled_at'
                type='datetime-local'
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={mealData.scheduled_at}
                onChange={handleInputChange}
                margin='normal'
                size='small'
                required
              />
              <TextField
                fullWidth
                label='Maximum Reservations'
                name='max_reservations'
                type='number'
                size='small'
                slotProps={{
                  input: {
                    inputProps: {
                      min: 1,
                    },
                  },
                }}
                value={mealData.max_reservations}
                onChange={handleInputChange}
                margin='normal'
                required
              />
              <TextField
                fullWidth
                label='Price'
                name='price'
                type='number'
                size='small'
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position='start'>DKK</InputAdornment>
                    ),
                    inputProps: {
                      min: 0,
                    },
                  },
                }}
                value={mealData.price}
                onChange={handleInputChange}
                margin='normal'
                required
              />
              <ImagePicker />

              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                size='small'
                sx={{ mt: 2 }}
              >
                Share Your Meal
              </Button>
            </form>
          </Paper>
        </Container>
      </Container>
    </main>
  );
}
