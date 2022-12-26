import { DischargeDate, HealthCheckRating, Entry, NewEntryType, SickLeave, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";
import { v1 as uuid } from 'uuid';

// Helper functions to check types
// String
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// Date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Number
const isNumber = (digit: unknown): digit is number => {
  return typeof digit === 'number' || digit instanceof Number;
};

// Array and string
const isArray = (element: unknown[]) => {
  return element.every(isString);
};

// Heath check rating
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

// Entry type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is NewEntryType => {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(NewEntryType).includes(param);
};

// Parse types
const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error(`Improper or missing description - value gotten: "${description}"`);
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date ||  !isString(date) || !isDate(date)) {
    throw new Error(`Improper or missing date - value gotten: "${date}"`);
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Improper or missing specialist - value gotten: "${specialist}"`);
  }

  return specialist;
};

const parseType = (type: unknown): NewEntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error(`Improper or missing type - value gotten: "${type}"`);
  }

  return type;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  console.log(!String(healthCheckRating), !isHealthCheckRating(healthCheckRating), !isNumber(Number(healthCheckRating)), isHealthCheckRating(healthCheckRating));
  // Potentiaaly temporary name to check typing from frontend
  // const healthCheckRatings = Number(healthCheckRating);
  if (!String(healthCheckRating) || !isHealthCheckRating(healthCheckRating) || !isNumber(Number(healthCheckRating))) {
    throw new Error(`Improper or missing healthCheckRating - value gotten: "${healthCheckRating}"`);
  }
  console.log('parseHealthCheckRating');
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Improper or missing healthCheckRating - value gotten: "${employerName}"`);
  }

  return employerName;
};

// helper for sickLeave type check
const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
  return (sickLeave as SickLeave).startDate !== undefined && (sickLeave as SickLeave).endDate !== undefined;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (isSickLeave(sickLeave) && Object.keys(sickLeave).length === 2) {
    if (!isString(sickLeave.startDate) || !isString(sickLeave.endDate) || 
    !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)) {
      throw new Error(`Improper or missing sickLeave values - values gotten: "${sickLeave}"`);
    } else {
      return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
    }
  } 

  return undefined;
};

// helper for discharge type check
const isDischarge = (discharge: unknown): discharge is DischargeDate => {
  return (discharge as DischargeDate).date !== undefined && (discharge as DischargeDate).criteria !== undefined;
};

const parseDischarge = (discharge: unknown): DischargeDate => {
  if (isDischarge(discharge) && Object.keys(discharge).length === 2) {
    if (!discharge.date || !discharge.criteria || !isString(discharge.date) || !isDate(discharge.date) || !isString(discharge.criteria)) {
      throw new Error(`Improper or missing discharge values - values gotten: "${discharge}"`);
    }
  
    return { date: discharge.date, criteria: discharge.criteria };
  }
  throw new Error(`Improper or missing discharge values - values gotten: "${discharge}"`);
};

const parseDiagnosisCodes = (diagnosisCodes: unknown[]): string[] | undefined=> {
  if (diagnosisCodes) {
      if (!diagnosisCodes || !isArray(diagnosisCodes)) {
          throw new Error(`Improper or missing diagnosisCodes values - values gotten: "${JSON.stringify(diagnosisCodes)}"`);
        } else {
          return diagnosisCodes as string[];
        }
  } 
  return undefined;
};

type BaseFields = { date: unknown, type: unknown, description: unknown, specialist: unknown, diagnosisCodes: unknown[], healthCheckRating: unknown, employerName: unknown, sickLeave: SickLeave, discharge: unknown };


const toNewEntriesEntry = ({ date, type, description, specialist, diagnosisCodes, employerName, sickLeave, discharge, healthCheckRating }: BaseFields): Entry => {
  const baseNewEntriesEntry = {
    date: parseDate(date),
    type: parseType(type),
    description: parseDescription(description),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
  };
  switch (type) {
    case "HealthCheck":
      const newHealthCheckEntry: HealthCheckEntry = {
        ...baseNewEntriesEntry,
        id: uuid(),
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
      return newHealthCheckEntry;
    case "OccupationalHealthcare":
      const newOccupationalHealthcareEntry: OccupationalHealthcareEntry = {
        ...baseNewEntriesEntry,
        id: uuid(),
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(employerName),
        sickLeave: parseSickLeave(sickLeave)
      };
      return newOccupationalHealthcareEntry;
    case "Hospital":
      const newHospitalEntry: HospitalEntry = {
        ...baseNewEntriesEntry,
        id: uuid(),
        type: "Hospital",
        discharge: parseDischarge(discharge)
      };
      return newHospitalEntry;
    default:
      throw new Error('Invalid or undefined type');
  }
};

export default toNewEntriesEntry;