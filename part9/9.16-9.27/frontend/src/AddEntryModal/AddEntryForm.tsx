import { Field, Formik, Form, FormikProps } from "formik";
import { Grid, Button } from "@material-ui/core";
import { DiagnosisSelection, HealthCheckRatingSelection, TextField, TypeSelectField, TypeOption } from "./FormField";
import { useStateValue } from "../state";

import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewEntryType, OccupationalHealthcareEntry } from "../types";

export type EntryFormValues = Omit<Entry, "id">;

export enum EntryFormTypes {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: NewEntryType.HealthCheck, label: "Health Check" },
  { value: NewEntryType.Hospital, label: "Hospital"},
  { value: NewEntryType.OccupationalHealthcare, label: "Occupational Healthcare" }
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const initialValuesHelper = (type: string): EntryFormValues => {
    const baseValues = {
      type: type,
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: undefined,
    };
    switch (type) {
      case "HealthCheck":
        const healthCheckValues: Omit<HealthCheckEntry, "id"> = {
          ...baseValues,
          type: "HealthCheck",
          healthCheckRating: -1
        };
        return healthCheckValues as HealthCheckEntry;
      case "OccupationalHealthcare":
        const occupationalHealthcareValues: Omit<OccupationalHealthcareEntry, "id"> = {
          ...baseValues,
          type: "OccupationalHealthcare",
          employerName: "",
          sickLeave: {
            startDate: "",
            endDate: ""
          }
        };
        return occupationalHealthcareValues;
      case "Hospital":
        const hospitalEntryValues: Omit<HospitalEntry, "id"> = {
          ...baseValues,
          type: "Hospital",
          discharge: {
            date: "",
            criteria: ""
          }
        };
        return hospitalEntryValues;
      default:
       return { ...baseValues, type: "HealthCheck" };
    }
  };

  const entryTypeFields = (type: string,
    setFieldValue: FormikProps<{ healthCheckRating: HealthCheckRating }>["setFieldValue"],
    setFieldTouched: FormikProps<{ healthCheckRating: HealthCheckRating }>["setFieldTouched"]
    
    ) => {
    console.log(type);
    switch (type) {
      case "HealthCheck":
        return (
          <HealthCheckRatingSelection
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          />
        );
      case "OccupationalHealthcare":
        return (
          <>
            <Field 
              label="Employer"
              placeholder="e.g. Police, FBI, Military"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Start of sick leave"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="End of sick leave"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </>
        );
      case "Hospital":
        return (
          <>
            <Field 
              label="Date of Discharge"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field 
              label="Criteria for Discharge"
              placeholder="E.g. thumb has healed"
              name="discharge.criteria"
              component={TextField}
            />
          </>
        );
      default:
        break;
    }
  };

  return (
    <Formik
      initialValues={initialValuesHelper("healthCheck")}
      // initialValues={{
      //   type: EntryFormTypes.OccupationalHealthcare,
      //   description: "",
      //   date: "",
      //   specialist: "",
      //   diagnosisCodes: undefined,
      //   healthCheckRating: -1,
      //   employer: "",
      //   sickLeave: {
      //     startDate: "",
      //     endDate: ""
      //   }
      // }}
      onSubmit={onSubmit}
      enableReinitialize
      validate={values => {
        const requiredError = "Field is required";
        const formattingError = "Format of the field is wrong";
        const errors: { [field: string]:string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date) {
          if (!/^[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}?$/.test(values.date)) {
            errors.date = formattingError;
            console.log(errors.date = formattingError);
          }
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryFormTypes.HealthCheck) {
          if ((values as HealthCheckEntry).healthCheckRating === undefined || (values as HealthCheckEntry).healthCheckRating < 0) {
            errors.healthCheckRating = requiredError;
          }
        }
        if (values.type === EntryFormTypes.OccupationalHealthcare) {
          if (!(values as OccupationalHealthcareEntry).employerName) {
            errors.employerName = requiredError;
          }
          if ((values as OccupationalHealthcareEntry).sickLeave?.startDate || (values as OccupationalHealthcareEntry).sickLeave?.endDate) {
            if (!(values as OccupationalHealthcareEntry).sickLeave?.startDate || !(values as OccupationalHealthcareEntry).sickLeave?.endDate) {
              errors.sickLeave = requiredError;
            }
            if (!/^[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}?$/.test((values as OccupationalHealthcareEntry).sickLeave?.startDate ?? "") || !/^[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}?$/.test((values as OccupationalHealthcareEntry).sickLeave?.endDate ?? "")) {
              errors.sickLeave = formattingError;
            }
          }
        }
        if (values.type === EntryFormTypes.Hospital) {
          if (!(values as HospitalEntry).discharge.date || !(values as HospitalEntry).discharge.criteria) {
            errors.discharge = requiredError;
          }
          if (!/^[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}?$/.test((values as HospitalEntry).discharge.date)) {
            errors.discharge = formattingError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        console.log(dirty);
        console.log(!dirty);
        console.log(!isValid);
        console.log(values);
        console.log(initialValuesHelper(values.type));
        return (
          <Form className="form ui">
            <TypeSelectField 
              name="type"
              label="Type of Report"
              options={typeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {/* <HealthCheckRatingSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            /> */}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {entryTypeFields(values.type, setFieldValue, setFieldTouched)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;