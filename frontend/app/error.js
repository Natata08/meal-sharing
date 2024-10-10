"use client";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth='md' sx={{ mt: 13 }}>
      <Alert
        severity='error'
        action={
          <Button
            variant='outlined'
            color='inherit'
            size='small'
            onClick={() => reset()}
          >
            Try again
          </Button>
        }
      >
        {"We're having trouble loading the meals right now."}
      </Alert>
    </Container>
  );
}
