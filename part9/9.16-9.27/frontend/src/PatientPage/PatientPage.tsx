import { useState } from 'react';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { PatientEntry, DiagnosisEntry, Entry } from "../types";
import { updatePatient, useStateValue, addDiagnoses, updateEntry } from "../state";
import { Button } from "@material-ui/core";
import axios from "axios";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

// components
import PatientEntries from "./PatientEntries";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  // const [patient, setPatient] = React.useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const patient = Object.values(patients).find(patient => patient.id === id);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry} = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${String(id)}/entries`, values
      );
      console.log(newEntry);
      dispatch(updateEntry(newEntry, String(id)));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient?.ssn) {
    console.log('Updating patient data with entries and ssn');
    const getPatient = async () => {
      try {
        const { data: patient } = await axios.get<PatientEntry>(`${apiBaseUrl}/patients/${String(id)}`);
        // dispatch({ type: "UPDATE_PATIENT", payload: patient });
        console.log(patient);
        dispatch(updatePatient(patient));
        // setPatient(patient);
      } catch (e) {
        console.error(e);
      }
    };
    const getDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<DiagnosisEntry[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(addDiagnoses(diagnoses)); 
        console.log(diagnoses);
      } catch (e) {
        console.error(e);
      }
    };
    void getPatient();
    void getDiagnoses();
  }

  // React.useEffect(() => {
  //   const getPatient = async () => {
  //     try {
  //       const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${String(id)}`);
  //       setPatient(patient);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   void getPatient();
  // }, [dispatch]);

  console.log(diagnoses.find(diagnosis => diagnosis.code === "J06.9"));
  console.log(diagnoses.length);

  if (patient?.entries) {
    return (
      <div>
        <div>
          <h2>{patient.name} {patient.gender === "other" ? null : patient.gender === "female" ? <FemaleIcon></FemaleIcon> : <MaleIcon></MaleIcon>}</h2>
          <p></p>
          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
        </div>
        <br></br>
        <div style={{ marginBottom: "1em" }}>
          <h3>Entries</h3>
          {patient.entries.map(entry => 
            <PatientEntries key={entry.id} entry={entry} diagnoses={diagnoses} />
          )}
        </div>
        <AddEntryModal 
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" color="primary" onClick={() => openModal()}>
            Add new entry
        </Button>
      </div>
    );
  }
  return (
    null
  );
};

export default PatientPage;