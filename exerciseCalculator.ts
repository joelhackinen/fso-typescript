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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));