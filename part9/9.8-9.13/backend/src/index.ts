import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';
const app = express();
app.use(express.json());

const PORT = 3001;

// const options = {
//   origin: 'http://localhost:3000'
// };

app.use(cors());

app.get('/api/ping', (_req, res) => {
  // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  console.log('ping route');
  res.send('test ping');
});

// app.get('/api/patients', (_req, res) => {
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.send('jorma');
// });

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});