import knex from "../database_client.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await knex.from("review").select();
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching reviews" });
  }
};

export const addNewReview = async (req, res) => {
  try {
    const [id] = await knex("review").insert(req.body);
    const newReview = await knex("review").where({ id: id }).first();
    res
      .status(201)
      .json({ message: "New review added successfully", review: newReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error adding new review" });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID provided",
      });
    }

    const review = await knex.from("review").select().where({ id: id }).first();

    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error finding a review" });
  }
};

export const updateReviewById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID provided",
      });
    }

    const isUpdated = await knex("review").where({ id: id }).update(req.body);

    if (isUpdated) {
      const updatedReview = await knex("review").where({ id: id }).first();
      res.status(201).json({
        message: "Review updated successfully",
        "updated review": updatedReview,
      });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating a review" });
  }
};

export const deleteReviewById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID provided",
      });
    }

    const isDeleted = await knex("review").where({ id: id }).del();

    if (isDeleted) {
      res.json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting a review" });
  }
};
