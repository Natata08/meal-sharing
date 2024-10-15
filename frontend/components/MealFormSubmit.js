"use client";

import { useFormStatus } from "react-dom";
import Button from "@mui/material/Button";

export default function MealFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      variant='contained'
      color='primary'
      fullWidth
      size='small'
      sx={{ mt: 2 }}
      disabled={pending}
    >
      {pending ? "Submitting..." : "Share Your Meal"}
    </Button>
  );
}
