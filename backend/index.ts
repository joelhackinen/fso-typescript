import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { Result, calculateExercises } from "./exerciseCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;

  if (!weight || !height) {
    return res.json({ error: "malformatted parameters" });
  }

  const weightNum = Number(weight);
  const heightNum = Number(height);

  if (isNaN(weightNum) || isNaN(heightNum)) {
    return res.json({ error: "malformatted parameters" });
  }

  let bmi: string;
  try {
    bmi = calculateBmi(heightNum, weightNum);
  } catch (error: unknown) {
    let errorMessage = "Error: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    bmi = errorMessage;
  }

  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi
  });
});

app.use(express.json());

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.json({ error: "parameters missing" });
  }

  if (!(daily_exercises instanceof Array) || !daily_exercises.every(e => typeof e === "number")) {
    return res.json({ error: "malformatted paramters "});
  }

  if (isNaN(Number(target))) {
    return res.json({ error: "malformatted paramters "});
  }

  let exerciseObject: Result;
  try {
    exerciseObject = calculateExercises(daily_exercises as number[], Number(target));
  } catch (error: unknown) {
    return res.json({ error: "malformatted paramters "});
  }
  return res.json(exerciseObject);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});