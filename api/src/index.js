import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mealRouters from "./routers/meals.js";
import reservationRouters from "./routers/reservations.js";
import reviewRouters from "./routers/reviews.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({
    name: "Meal Sharing API",
    version: "1.0.0",
    description:
      "An API for managing meals and reservations in a meal sharing application.",
    endpoints: [
      "/api/meals - manage meals",
      "/api/reservations - manage reservations",
    ],
  });
});

apiRouter.use("/meals", mealRouters);
apiRouter.use("/reservations", reservationRouters);
apiRouter.use("/reviews", reviewRouters);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});

export default app;
