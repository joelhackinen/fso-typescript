const calculateBmi = (height: number, weight: number): string => {
  const heightCm = height / 100;
  const bmi = weight / (heightCm * heightCm);

  if (bmi > 25) {
    return "Overweight";
  }
  if (25 >= bmi && bmi >= 18.5) {
    return "Normal (healthy weight)";
  }
  return "Underweight";
}

console.log(calculateBmi(180, 74));