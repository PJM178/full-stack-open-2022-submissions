import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { PatientEntry, NoSSNField, NewPatientEntry } from '../types';
const ids: string = uuid();

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getWithoutSSN = (): NoSSNField[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry): PatientEntry => {

  const newPatientEntry = {
    id: ids,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getWithoutSSN,
  addPatient,
};