import { State } from "./state";
import { DiagnosisEntry, PatientEntry, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: PatientEntry[];
    }
  | {
      type: "ADD_PATIENT";
      payload: PatientEntry;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: PatientEntry;
    }
  | {
      type: "DIAGNOSES";
      payload: DiagnosisEntry[]
    }
  | {
      type: "UPDATE_ENTRY";
      payload: { entry: Entry, id: string }  
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      console.log(action.payload);
      console.log(state);
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "UPDATE_ENTRY":
      const patient = state.patients[action.payload.id];
      patient.entries.push(action.payload.entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: patient
        } 
      };
    default:
      return state;
  }
};

// action creator functions
export const setPatientList = (patients: PatientEntry[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (patient: PatientEntry): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const updatePatient = (patient: PatientEntry): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient
  };
};

export const addDiagnoses = (diagnoses: DiagnosisEntry[]): Action => {
  return {
    type: "DIAGNOSES",
    payload: diagnoses
  };
};

export const updateEntry = (entry: Entry, id: string): Action => {
  return {
    type: "UPDATE_ENTRY",
    payload: { entry, id }
  };
};