type Rating = 1 | 2 | 3;

type RatingDescription = "good" | "ok" | "bad";

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
}

interface Input {
  data: number[];
  target: number;
}

const ratingDesc = (rating: Rating): RatingDescription => {
  switch (rating) {
    case 3:
      return "good";
    case 2:
      return "ok";
    default:
      return "bad";
  }
}


const calculateExercises = (arr: number[], target: number): Result => {
  const periodLength = arr.length;
  if (periodLength == 0) throw new Error("Empty array!");

  const average = arr.reduce((p, c) => p + c, 0) / periodLength;
  let rating: Rating;

  if (average >= target * 1.2) {
    rating = 3;
  } else if (average >= target * 0.8) {
    rating = 2;
  } else {
    rating = 1;
  }

  return {
    periodLength,
    trainingDays: arr.filter(d => d > 0).length,
    success: average >= target,
    rating,
    ratingDescription: ratingDesc(rating),
    target,
    average,
  };
}

const parseArguments = (args: string[]): Input => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const data = args.slice(3).map(v => Number(v));
  const target = Number(args[2]);

  if (isNaN(target)) throw new Error('Target should be a number!');

  data.forEach(n => {
    if (isNaN(n)) throw new Error('Exercise hours should be numbers!');
  });

  return {
    data,
    target
  };
}

try {
  const { data, target } = parseArguments(process.argv);
  console.log(calculateExercises(data, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export {};