"use client";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

export default function Error({ error, reset }) {
  return (
    <Container maxWidth='md' sx={{ mt: 4, mt: 13 }}>
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
        {error.message || "We're having trouble loading the meals right now."}
      </Alert>
    </Container>
  );
}
