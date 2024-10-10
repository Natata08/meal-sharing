import { useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import FormHelperText from "@mui/material/FormHelperText";

export default function ReviewModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ title: "", description: "", stars: null });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.stars === null) {
      setError("Please select a rating");
      return;
    }
    onSubmit(form);
    setForm({ title: "", description: "", stars: null });
    setError("");
  };

  const handleRatingChange = (event, newValue) => {
    setForm({ ...form, stars: newValue });
    if (newValue !== null) {
      setError("");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          p: 4,
        }}
      >
        <Typography variant='h6' gutterBottom>
          Write a Review
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Title'
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            margin='normal'
            required
          />
          <TextField
            fullWidth
            label='Description'
            multiline
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            margin='normal'
            required
          />
          <Typography component='legend'>Rating *</Typography>
          <Rating
            name='stars'
            value={form.stars}
            onChange={handleRatingChange}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit Review
          </Button>
        </form>
      </Paper>
    </Modal>
  );
}
