interface humanParameters {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): humanParameters => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values are not numbers');
  }
};

const calculateBmi = (h: number, m: number): string => {
  const bmi: number = m / (h/100)**2;
  if (bmi < 18.5) {
    return 'Underweight (unhealthy weight)';
  } else if (bmi >= 18.5 && bmi <= 22.9) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 23.0 && bmi <= 24.9) {
    return 'Overweight I (at risk)';
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return 'Overweight II (moderately obese)';
  } else {
    return 'Overweight III (severely obese)';
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch(error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += '\nError: ' + error.message;
  }
  console.log(errorMessage);
}

export { calculateBmi };