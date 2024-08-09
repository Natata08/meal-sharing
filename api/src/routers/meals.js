import express from "express";
import knex from "../database_client.js";

const router = express.Router();

router.get("/", async (req, res) => {
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
});

router.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex.raw(
      "SELECT * FROM meal WHERE scheduled_at > NOW() ORDER BY scheduled_at",
    );
    res.json(meals[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching upcoming meals" });
  }
});

router.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex.raw(
      "SELECT * FROM meal WHERE scheduled_at <= NOW() ORDER BY scheduled_at",
    );
    res.json(meals[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching past meals" });
  }
});

router.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM meal ORDER BY id");
    res.json(meals[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching all meals" });
  }
});

router.get("/first-meal", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM meal ORDER BY id ASC LIMIT 1");
    if (meals[0].length === 0) {
      res.status(404).json({ message: "There are no meals" });
    } else {
      res.json(meals[0][0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching the first meal added" });
  }
});

router.get("/last-meal", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM meal ORDER BY id DESC LIMIT 1");
    if (meals[0].length === 0) {
      res.status(404).json({ message: "There are no meals" });
    } else {
      res.json(meals[0][0]);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error fetching the most recently added meal" });
  }
});

export default router;
