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

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
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
