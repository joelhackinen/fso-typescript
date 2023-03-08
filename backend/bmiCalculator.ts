interface Params {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): Params => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) throw new Error('Height cannot be 0');
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

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}