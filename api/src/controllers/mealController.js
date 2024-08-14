import knex from '../database_client.js';

export const getAllMeals = async (req, res) => {
  try {
    const meals = await knex.from('meal').select();
    res.json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching all meals' });
  }
};

export const addNewMeal = async (req, res) => {
  try {
    const { title, location, scheduled_at, max_reservations, price } = req.body;
    if (!title || !location || !scheduled_at || !max_reservations || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [id] = await knex('meal').insert(req.body);
    const newMeal = await knex('meal').where({ id: id });
    res
      .status(201)
      .json({ message: 'New meal added successfully', meal: newMeal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error adding new meal' });
  }
};

export const getMealById = async (req, res) => {
  try {
    const id = req.params.id;
    const [meal] = await knex.from('meal').select().where({ id: id });
    if (meal) {
      res.json(meal);
    } else {
      res.status(404).json({ error: 'Meal not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error finding a meal' });
  }
};

export const getFutureMeals = async (req, res) => {
  try {
    const [meals] = await knex.raw(
      'SELECT * FROM meal WHERE scheduled_at > NOW() ORDER BY scheduled_at'
    );
    res.json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching upcoming meals' });
  }
};

export const getPastMeals = async (req, res) => {
  try {
    const [meals] = await knex.raw(
      'SELECT * FROM meal WHERE scheduled_at <= NOW() ORDER BY scheduled_at'
    );
    res.json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching past meals' });
  }
};

export const getFirstMeal = async (req, res) => {
  try {
    const [meal] = await knex.raw('SELECT * FROM meal ORDER BY id ASC LIMIT 1');
    if (meal.length === 0) {
      res.status(404).json({ message: 'There are no meals' });
    } else {
      const [firstMeal] = meal;
      res.json(firstMeal);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching the first meal added' });
  }
};

export const getLastMeal = async (req, res) => {
  try {
    const [meal] = await knex.raw(
      'SELECT * FROM meal ORDER BY id DESC LIMIT 1'
    );
    if (meal.length === 0) {
      res.status(404).json({ message: 'There are no meals' });
    } else {
      const [lastMeal] = meal;
      res.json(lastMeal);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: 'Error fetching the most recently added meal' });
  }
};
