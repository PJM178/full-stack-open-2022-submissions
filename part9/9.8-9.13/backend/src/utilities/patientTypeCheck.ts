import { NewPatientEntry, Gender } from '../types';

// Helper functions to check types
// String
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// Date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Gender
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// Name type check - string
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Improper or missing name ' + name);
  }

  return name;
};

// Ssn type check - string
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Improper or missing social security number: "${ssn}"`);
  }

  return ssn;
};

// Date of birth type check - string // date
const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

// Gender type check - initial, no enum
// const parseGender = (gender: unknown): string => {
//   if (!gender || !isString(gender)) {
//     throw new Error('Incorrect or missing gender ' + gender);
//   }
//   return gender;
// };

// Gender type check - enum type
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Improper or missing gender: "${gender}"`);
  }

  return gender;
};

// Occupation type check - string
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation' + occupation);
  }
  return occupation;
};

// Patient field types
type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };

// All fields type check
const toNewPatientEntry = ({ name, ssn, dateOfBirth, gender, occupation }: Fields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(name),
    ssn: parseSsn(ssn),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };

  return newPatient;
};

export default toNewPatientEntry;