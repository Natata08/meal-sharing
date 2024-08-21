import knex from "../database_client.js";

export const getMealsWithQueries = async (req, res) => {
  try {
    let query = knex.select("m.*").from("meal AS m");

    if (req.query.maxPrice) {
      query = query.where("price", "<", parseFloat(req.query.maxPrice));
    }

    if ("availableReservations" in req.query) {
      const isAvailable = req.query.availableReservations === "true";
      query = query
        .leftJoin("reservation AS r", "m.id", "r.meal_id")
        .groupBy("m.id")
        .havingRaw(
          isAvailable
            ? "m.max_reservations > COALESCE(SUM(r.number_of_guests), 0)"
            : "m.max_reservations <= COALESCE(SUM(r.number_of_guests), 0)",
        );
    }

    if (req.query.title) {
      query = query.where("title", "like", `%${req.query.title}%`);
    }

    if (req.query.dateAfter) {
      query = query.where("scheduled_at", ">", req.query.dateAfter);
    }

    if (req.query.dateBefore) {
      query = query.where("scheduled_at", "<", req.query.dateBefore);
    }

    if (req.query.limit) {
      query = query.limit(parseInt(req.query.limit));
    }

    if (req.query.sortKey) {
      const { sortKey, sortDir } = req.query;
      const allowedKeysToSort = ["scheduled_at", "max_reservations", "price"];

      if (allowedKeysToSort.includes(sortKey)) {
        query = query.orderBy(sortKey, sortDir === "desc" ? "desc" : "asc");
      }
    }

    const meals = await query;
    res.json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching all meals" });
  }
};

export const addNewMeal = async (req, res) => {
  try {
    const [id] = await knex("meal").insert(req.body);
    const newMeal = await knex("meal").where({ id: id }).first();
    res
      .status(201)
      .json({ message: "New meal added successfully", meal: newMeal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error adding new meal" });
  }
};

export const getMealById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID provided",
      });
    }

    const meal = await knex.from("meal").select().where({ id: id }).first();

    if (meal) {
      res.json(meal);
    } else {
      res.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error finding a meal" });
  }
};

export const updateMealById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID provided",
      });
    }

    const isUpdated = await knex("meal").where({ id: id }).update(req.body);

    if (isUpdated) {
      const updatedMeal = await knex("meal").where({ id: id }).first();
      res.status(201).json({
        message: "Meal updated successfully",
        "updated meal": updatedMeal,
      });
    } else {
      res.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating a meal" });
  }
};

export const deleteMealById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID provided",
      });
    }

    const isDeleted = await knex("meal").where({ id: id }).del();

    if (isDeleted) {
      res.json({ message: "Meal deleted successfully" });
    } else {
      res.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting a meal" });
  }
};

export const getFutureMeals = async (req, res) => {
  try {
    const meals = await knex("meal")
      .select()
      .where("scheduled_at", ">", knex.fn.now())
      .orderBy("scheduled_at");
    res.json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching upcoming meals" });
  }
};

export const getPastMeals = async (req, res) => {
  try {
    const meals = await knex("meal")
      .select()
      .where("scheduled_at", "<=", knex.fn.now())
      .orderBy("scheduled_at");
    res.json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching past meals" });
  }
};

export const getFirstMeal = async (req, res) => {
  try {
    const meal = await knex("meal").orderBy("id", "asc").first();

    if (!meal) {
      res.status(404).json({ message: "There are no meals" });
    } else {
      res.json(meal);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching the first meal added" });
  }
};

export const getLastMeal = async (req, res) => {
  try {
    const meal = await knex("meal").orderBy("id", "desc").first();

    if (!meal) {
      res.status(404).json({ message: "There are no meals" });
    } else {
      res.json(meal);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error fetching the most recently added meal" });
  }
};

export const getReviewsForMeal = async (req, res) => {
  try {
    const meal_id = parseInt(req.params.meal_id);

    if (isNaN(meal_id)) {
      return res.status(400).json({
        error: "Invalid ID provided",
      });
    }

    const reviews = await knex
      .from("review")
      .select()
      .where({ meal_id: meal_id });
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error finding reviews" });
  }
};
