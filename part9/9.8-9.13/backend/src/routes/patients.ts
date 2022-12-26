import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utilities/patientTypeCheck';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getWithoutSSN());
});

router.get('/all-fields', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong typing new patient.';
    if (error instanceof Error) {
      errorMessage += ' Error ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;