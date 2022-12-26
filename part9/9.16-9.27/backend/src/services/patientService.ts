import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { PatientEntry, NoSSNField, NewPatientEntry, Entry } from '../types';

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

const getPatient = (id: string): PatientEntry => {
  const patient: PatientEntry = patients.find(patient => patient.id === id) as PatientEntry;
  // const patientWithEntry = {
  //   ...patient,
  //   entries: []
  // };
  return patient;
};

const addPatient = ( entry: NewPatientEntry): PatientEntry => {

  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntriesEntry = (entry: Entry, id: string): Entry => {
  const patientIndex = patients.findIndex(
    (patient) => patient.id === id
  );

  console.log('add');
  patients[patientIndex].entries.push(entry);
  console.log(entry);
  return entry;
};

export default {
  getEntries,
  getWithoutSSN,
  addPatient,
  getPatient,
  addEntriesEntry
};