"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AlertTitle from "@mui/material/AlertTitle";
import ListItemText from "@mui/material/ListItemText";

import ImagePicker from "@/components/ui/ImagePicker";
import MealFormSubmit from "@/components/MealFormSubmit";
import { shareMeal } from "@/utils/actions";

import { useFormState } from "react-dom";
import { useState, useEffect } from "react";

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, { errors: null });
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (state.errors) {
      setShowErrors(true);
    }
  }, [state.errors]);

  const handleInputChange = () => {
    setShowErrors(false);
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
            <form action={formAction}>
              <TextField
                fullWidth
                label='Meal Title'
                name='title'
                margin='normal'
                size='small'
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label='Description'
                name='description'
                margin='normal'
                multiline
                rows={4}
                size='small'
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label='Location'
                name='location'
                margin='normal'
                size='small'
                onChange={handleInputChange}
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
                margin='normal'
                size='small'
                onChange={handleInputChange}
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
                margin='normal'
                onChange={handleInputChange}
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
                margin='normal'
                onChange={handleInputChange}
                required
              />
              <ImagePicker
                label='Your image'
                name='image'
                onChange={handleInputChange}
              />

              {showErrors && state.errors && (
                <Alert
                  severity='error'
                  onClose={() => setShowErrors(false)}
                  sx={{ mt: 2 }}
                >
                  <AlertTitle>Error</AlertTitle>
                  <List dense disablePadding>
                    {state.errors.map((error, index) => (
                      <ListItem key={`error-${index}`}>
                        <ListItemText primary={error} />
                      </ListItem>
                    ))}
                  </List>
                </Alert>
              )}

              <MealFormSubmit />
            </form>
          </Paper>
        </Container>
      </Container>
    </main>
  );
}
