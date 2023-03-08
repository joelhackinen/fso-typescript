import express from "express";
import { calculateBmi } from "./bmiCalculator";

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

  if (isNaN(Number(weightNum)) || isNaN(Number(heightNum))) {
    return res.json({ error: "malformatted parameters" });
  }

  let bmi: string;
  try {
    bmi = calculateBmi(heightNum, weightNum);
  } catch (error: unknown) {
    let errorMessage = "Error: "
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});