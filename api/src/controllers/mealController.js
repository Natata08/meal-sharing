import knex from "../database_client.js";

export const getApiInfo = async (req, res) => {
  res.json({
    name: "Meal Sharing API",
    version: "1.0.0",
    description:
      "An API for a meal sharing platform. Allows users to view upcoming and past meals, get information about all meals, and retrieve details about the first and last meals added to the system.",
    endpoints: [
      "/api/future-meals - Get all upcoming meals",
      "/api/past-meals - Get all past meals",
      "/api/all-meals - Get all meals sorted by ID",
      "/api/first-meal - Get the first meal added",
      "/api/last-meal - Get the most recently added meal",
    ],
  });
};

export const getFutureMeals = async (req, res) => {
  try {
    const [meals] = await knex.raw(
      "SELECT * FROM meal WHERE scheduled_at > NOW() ORDER BY scheduled_at",
    );
    res.json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching upcoming meals" });
  }
};

export const getPastMeals = async (req, res) => {
  try {
    const [meals] = await knex.raw(
      "SELECT * FROM meal WHERE scheduled_at <= NOW() ORDER BY scheduled_at",
    );
    res.json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching past meals" });
  }
};

export const getAllMeals = async (req, res) => {
  try {
    const [meals] = await knex.raw("SELECT * FROM meal ORDER BY id");
    res.json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching all meals" });
  }
};

export const getFirstMeal = async (req, res) => {
  try {
    const [meal] = await knex.raw("SELECT * FROM meal ORDER BY id ASC LIMIT 1");
    if (meal.length === 0) {
      res.status(404).json({ message: "There are no meals" });
    } else {
      const [firstMeal] = meal;
      res.json(firstMeal);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching the first meal added" });
  }
};

export const getLastMeal = async (req, res) => {
  try {
    const [meal] = await knex.raw(
      "SELECT * FROM meal ORDER BY id DESC LIMIT 1",
    );
    if (meal.length === 0) {
      res.status(404).json({ message: "There are no meals" });
    } else {
      const [lastMeal] = meal;
      res.json(lastMeal);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error fetching the most recently added meal" });
  }
};
