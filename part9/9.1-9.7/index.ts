import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

console.log(calculateBmi(180, 72));

// get requests
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;
  if (!isNaN(Number(weight)) && !isNaN(Number(height)) && weight && height) {
    const bmiResponse = {
      weight: weight,
      height: height,
      bmi: calculateBmi(Number(height), Number(weight))
    };
    res.json(bmiResponse);
  } else {
    res.status(400).json({error: "malformatted parameters"});
  }
});

// post requests
app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const dailyExercises = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(req.body.target);
  if (Array.isArray(dailyExercises) === false) {
    res.status(400).json({error: "malformatted parameters"});
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  } else if (dailyExercises.every((item: number) => !isNaN(Number(item))) && !isNaN(Number(target)) && dailyExercises.length >= 1) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const exerciseResult = calculateExercises(dailyExercises, Number(target));
    res.json(exerciseResult);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  } else if (dailyExercises.length < 1) {
    res.status(400).json({error: "parameters missing"});
  } else {
    res.status(400).json({error: "malformatted parameters"});
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});