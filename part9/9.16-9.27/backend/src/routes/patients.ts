import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utilities/patientTypeCheck';
import toNewEntriesEntry from '../utilities/entryTypeCheck';

const router = express.Router();

// get methods
router.get('/', (_req, res) => {
  res.send(patientService.getWithoutSSN());
});

router.get('/all-fields', (_req, res) => {
  res.send(patientService.getEntries());
});

// get a single patient
router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

// post methods
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

// post an entry to entries list
router.post('/:id/entries', (req, res) => {
  try {
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntriesEntry = toNewEntriesEntry(req.body);
    const addedEntriesEntry = patientService.addEntriesEntry(newEntriesEntry, req.params.id);
    res.json(addedEntriesEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong typing new entries entry.';
    if (error instanceof Error) {
      errorMessage += ' Error ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;