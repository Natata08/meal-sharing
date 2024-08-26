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
    //checking available spots for reservation
    const { meal_id, number_of_guests } = req.body;
    const meal = await knex("meal").where({ id: meal_id }).first();

    if (!meal) {
      return res.status(404).json({ error: "There is no meal with such ID" });
    }

    const query = await knex("reservation")
      .where({ meal_id: meal_id })
      .sum("number_of_guests")
      .first();

    const currentReservations = parseInt(query["sum(`number_of_guests`)"]) || 0;
    const availableSpots = meal.max_reservations - currentReservations;

    if (number_of_guests > availableSpots) {
      return res.status(400).json({
        error: "Not enough available spots",
        "available spots": availableSpots,
      });
    }

    const [id] = await knex("reservation").insert(req.body);
    const newReservation = await knex("reservation").where({ id: id }).first();
    res.status(201).json({
      message: "New reservation added successfully",
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

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID provided",
      });
    }

    const reservation = await knex
      .from("reservation")
      .select()
      .where({ id: id })
      .first();

    if (reservation) {
      return res.json(reservation);
    }

    res.status(404).json({ error: "Reservation not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error finding a reservation" });
  }
};

export const updateReservationById = async (req, res) => {
  try {
    //checking available spots for reservation
    const { meal_id, number_of_guests } = req.body;
    const reservationId = req.params.id;
    const meal = await knex("meal").where({ id: meal_id }).first();

    if (!meal) {
      return res.status(404).json({ error: "There is no meal with such ID" });
    }

    const query = await knex("reservation")
      .where({ meal_id: meal_id })
      .whereNot({ id: reservationId })
      .sum("number_of_guests")
      .first();

    const currentReservations = parseInt(query["sum(`number_of_guests`)"]) || 0;
    const availableSpots = meal.max_reservations - currentReservations;

    if (number_of_guests > availableSpots) {
      return res.status(400).json({
        error: "Not enough available spots",
        "available spots": availableSpots,
      });
    }

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID provided",
      });
    }

    const isUpdated = await knex("reservation")
      .where({ id: id })
      .update(req.body);

    if (isUpdated) {
      const updatedReservation = await knex("reservation")
        .where({ id: id })
        .first();
      return res.status(201).json({
        message: "Reservation updated successfully",
        "updated reservation": updatedReservation,
      });
    }

    res.status(404).json({ error: "Reservation not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating a reservation" });
  }
};

export const deleteReservationById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID provided",
      });
    }
    const isDeleted = await knex("reservation").where({ id: id }).del();

    if (isDeleted) {
      return res.json({ message: "Reservation deleted successfully" });
    }

    res.status(404).json({ error: "Reservation not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting a reservation" });
  }
};
