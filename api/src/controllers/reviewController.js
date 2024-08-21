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

export const getReviewById = async (req, res) => {};
export const updateReviewById = async (req, res) => {};
export const deleteReviewById = async (req, res) => {};
