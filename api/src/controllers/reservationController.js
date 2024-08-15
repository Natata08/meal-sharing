import knex from "../database_client.js";

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await knex.from("reservation").select();
    res.json(reservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching all reservations" });
  }
};

export const addNewReservation = async (req, res) => {
  try {
    const [id] = await knex("reservation").insert(req.body);
    const [newReservation] = await knex("reservation").where({ id: id });
    res.status(201).json({
      message: "New meal added successfully",
      reservation: newReservation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error adding new reservation" });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [reservation] = await knex
      .from("reservation")
      .select()
      .where({ id: id });
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error finding a reservation" });
  }
};

export const updateReservationById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const isUpdated = await knex("reservation")
      .where({ id: id })
      .update(req.body);
    if (isUpdated) {
      const [updatedReservation] = await knex("reservation").where({ id: id });
      res.status(201).json({
        message: "Reservation updated successfully",
        updatedReservation: updatedReservation,
      });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating a reservation" });
  }
};

export const deleteReservationById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const isDeleted = await knex("reservation").where({ id: id }).del();
    if (isDeleted) {
      res.json({ message: "Reservation deleted successfully" });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting a reservation" });
  }
};
