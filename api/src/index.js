import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.get("/", async (req, res) => {
  res.json({
    name: "Meal Sharing API",
    version: "1.0.0",
    description:
      "An API for a meal sharing platform. Allows users to view upcoming and past meals, get information about all meals, and retrieve details about the first and last meals added to the system.",
    endpoints: [
      "/future-meals - Get all upcoming meals",
      "/past-meals - Get all past meals",
      "/all-meals - Get all meals sorted by ID",
      "/first-meal - Get the first meal added",
      "/last-meal - Get the most recently added meal",
    ],
  });
});

apiRouter.get("/future-meals", async (req, res) => {
  const meals = await knex.raw(
    "SELECT * FROM meal WHERE scheduled_at > NOW() ORDER BY scheduled_at",
  );
  res.json(meals[0]);
});

apiRouter.get("/past-meals", async (req, res) => {
  const meals = await knex.raw(
    "SELECT * FROM meal WHERE scheduled_at < NOW() ORDER BY scheduled_at",
  );
  res.json(meals[0]);
});

apiRouter.get("/all-meals", async (req, res) => {
  const meals = await knex.raw("SELECT * FROM meal");
  res.json(meals[0]);
});

apiRouter.get("/first-meal", async (req, res) => {
  const meals = await knex.raw("SELECT * FROM meal ORDER BY id ASC LIMIT 1");
  res.json(meals[0]);
});

apiRouter.get("/last-meal", async (req, res) => {
  const meals = await knex.raw("SELECT * FROM meal ORDER BY id DESC LIMIT 1");
  res.json(meals[0]);
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
