import { DiagnosisEntry, Entry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

// define types

interface EntryProps {
  entry: Entry;
  diagnoses: DiagnosisEntry[];
}

const PatientEntries = (props: EntryProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.entry.type) {
    case "HealthCheck":
      return (
        <div className="patient-entry">
          <div style={{ marginBottom: "5px" }}>{props.entry.date} <MedicalInformationIcon></MedicalInformationIcon></div>
          <div style={{ marginBottom: "5px", overflowWrap: "break-word" }}><i>{props.entry.description}</i></div> 
          {props.entry.diagnosisCodes ? <div style={{ marginBottom: "5px" }}>
            <ul>
              {props.entry.diagnosisCodes?.map((code, i) => 
                <li key={i}>{code} {props.diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>
              )}
            </ul>
          </div> : null }
          {/* <div style={{ marginBottom: "5px" }}>{props.entry.healthCheckRating}</div> */}
          <div style={{ marginBottom: "5px" }}>
            <HealthRatingBar rating={props.entry.healthCheckRating} showText={false} />
          </div>
          <div>diagnosed by {props.entry.specialist}</div>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div className="patient-entry">
          <div style={{ marginBottom: "5px" }}>{props.entry.date} <WorkIcon></WorkIcon> {props.entry.employerName}</div>
          <div style={{ marginBottom: "5px" }}><i>{props.entry.description}</i></div>
          {props.entry.diagnosisCodes ? <div style={{ marginBottom: "5px" }}>
            <ul>
              {props.entry.diagnosisCodes?.map((code, i) => 
                <li key={i}>{code} {props.diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>
              )}
            </ul>
          </div> : null }
          {props.entry.sickLeave 
            ? <div style={{ marginBottom: "5px" }}>
              <div>Sick leave information</div>
                <ul style={{ listStyleType: "none" }}>
                  <li>Start date: {props.entry.sickLeave?.startDate}</li>
                  <li>End date: {props.entry.sickLeave?.endDate}</li>
                </ul>
              </div>
            : null
          }
          
          <div>diagnosed by {props.entry.specialist}</div>
        </div>
      );
    case "Hospital":
      return (
        <div className="patient-entry">
        <div style={{ marginBottom: "5px" }}>{props.entry.date} <LocalHospitalIcon></LocalHospitalIcon></div>
        <div style={{ marginBottom: "5px" }}><i>{props.entry.description}</i></div> 
        {props.entry.diagnosisCodes ? <div style={{ marginBottom: "5px" }}>
            <ul>
              {props.entry.diagnosisCodes?.map((code, i) => 
                <li key={i}>{code} {props.diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>
              )}
            </ul>
          </div> : null }
        <div style={{ marginBottom: "5px" }}>
          <div>Discharge information</div>
          <ul style={{ listStyleType: "none" }}>
            <li>Criteria: {props.entry.discharge.criteria}</li>
            <li>Date: {props.entry.discharge.date}</li>
          </ul>
        </div>
        <div>diagnosed by {props.entry.specialist}</div>
        </div>
      );
    default:
      return assertNever(props.entry);
  }

  // return (
  //   <div>
  //     {props.patient.entries.map(entry => 
  //         <div key={entry.id} className="patient-entry">
  //           <div>{entry.date} {entry.type}</div>
  //           <i>{entry.description}</i>
  //           <div>{entry.healthCheckRating}</div>
            // <ul>
            // {entry.diagnosisCodes?.map((code, i) => 
            //   <li key={i}>{code} {props.diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>
            // )}
            // </ul>
  //         </div>
  //         )} 
  //   </div>
  // );
};

export default PatientEntries;