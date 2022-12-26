interface weeklyResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface parseResult {
  argTargetNum: number
  argArrayNum: Array<number>
}

export const parseArguments = (args: Array<string>): parseResult => {
  const argTargetNum = args[2];
  const argArrayNum = args.slice(3, args.length).map(num => Number(num));
  if (args.length < 4) throw new Error('Not enough arguments');
  if (argArrayNum.every(item => !isNaN(Number(item))) && !isNaN(Number(argTargetNum))) {
    return {
      argTargetNum: Number(argTargetNum),
      argArrayNum: argArrayNum
    };
  } else {
    throw new Error('Provided values are not numbers');
  }
};

interface ratingType {
  rating: number;
  ratingDescription: string;
}

const ratingFunction = (target: number, realized: number): ratingType => {
  if (realized < target * 1/2) {
    return {rating: 1, ratingDescription: 'you can do better'};
  } else if (realized >= target * 1/2 && realized < target) {
    return {rating: 2, ratingDescription: 'not too bad but could be better'};
  } else {
    return {rating: 3, ratingDescription: 'good job, you reached your goal'};
  }
};

const calculateExercises = (args: Array<number>, target: number): weeklyResults => {
  const periodLength = Number(args.length);
  const trainingDays = args.filter(n => n > 0).length;
  const average = args.reduce((a, b) => a + b, 0) / periodLength;
  const success = target < average ? true : false;
  const rating = ratingFunction(target, average);
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating.rating,
    ratingDescription: rating.ratingDescription, 
    target: target,
    average: average
  };
};

try {
  const { argTargetNum, argArrayNum } = parseArguments(process.argv);
  console.log(calculateExercises(argArrayNum, argTargetNum));
} catch(error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += '\nError: ' + error.message;
  }
  console.log(errorMessage);
}

export { calculateExercises };