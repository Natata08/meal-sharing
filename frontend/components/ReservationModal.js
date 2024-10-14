import { useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export default function ReservationModal({
  open,
  onClose,
  onSubmit,
  mealId,
  available_spots,
}) {
  const [form, setForm] = useState({
    number_of_guests: 1,
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
  });

  const [phoneError, setPhoneError] = useState("");
  const [guestsError, setGuestsError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validatePhoneNumber(form.contact_phonenumber) &&
      validateGuests(form.number_of_guests) &&
      validateEmail(form.contact_email)
    ) {
      onSubmit({ ...form, meal_id: mealId });
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    try {
      const number = phoneUtil.parseAndKeepRawInput(phoneNumber, "EU");
      if (!phoneUtil.isValidNumber(number)) {
        setPhoneError("Please enter a valid phone number with country code");
        return false;
      }
      const formattedNumber = phoneUtil.format(
        number,
        PhoneNumberFormat.INTERNATIONAL
      );
      setForm({ ...form, contact_phonenumber: formattedNumber });
      setPhoneError("");
      return true;
    } catch (error) {
      setPhoneError("Invalid phone number format");
      return false;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateGuests = (guests) => {
    if (guests < 1) {
      setGuestsError("Number of guests must be at least 1");
      return false;
    }
    if (guests > available_spots) {
      setGuestsError(`Maximum ${available_spots} guests allowed`);
      return false;
    }
    setGuestsError("");
    return true;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, contact_phonenumber: value });
    validatePhoneNumber(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, contact_email: value });
    validateEmail(value);
  };

  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value);
    setForm({ ...form, number_of_guests: value });
    validateGuests(value);
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
          Make a Reservation
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Number of Guests'
            type='number'
            slotProps={{
              input: {
                inputProps: {
                  min: 1,
                  max: available_spots,
                },
              },
            }}
            value={form.number_of_guests}
            onChange={handleGuestsChange}
            margin='normal'
            required
            error={!!guestsError}
            helperText={guestsError || `Available spots: ${available_spots}`}
          />

          <TextField
            fullWidth
            label='Name'
            value={form.contact_name}
            onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
            margin='normal'
            required
          />
          <TextField
            fullWidth
            label='Email'
            type='email'
            value={form.contact_email}
            onChange={handleEmailChange}
            margin='normal'
            required
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            fullWidth
            label='Phone Number'
            type='tel'
            value={form.contact_phonenumber}
            onChange={handlePhoneChange}
            margin='normal'
            required
            error={!!phoneError}
            helperText={
              phoneError ||
              "Enter phone number with country code (e.g., +45 12 34 56 78)"
            }
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit Reservation
          </Button>
        </form>
      </Paper>
    </Modal>
  );
}
