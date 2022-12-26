import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import {
  Select,
  FormControl,
  MenuItem,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";
import { DiagnosisEntry, Gender, HealthCheckRating, NewEntryType } from "../types";
import { InputLabel } from "@material-ui/core";
import Input from '@material-ui/core/Input';

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

// Select field for type

// types for select type field
export type TypeOption = {
  value: NewEntryType;
  label: string;
};

type TypeSelectFieldProps = {
  name: string;
  label: string;
  options: TypeOption[];
};

export const TypeSelectField = ({ name, label, options }: TypeSelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
      placeholder={null}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max  }: NumberProps) => {
  const [value, setValue] = useState<number>();
  console.log(value);
  return (
    <div style={{ marginBottom: "1em" }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        value={value}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value === undefined) return;
          if (value > max) setValue(max);
          else if (value <= min) setValue(min);
          else setValue(Math.floor(value));
      }}
      />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: DiagnosisEntry[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, data);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));
  return (
    <FormControl style={{ width: 552, marginBottom: '30px' }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select multiple value={selectedDiagnoses} onChange={(e) => onChange(e.target.value as string[])} input={<Input />}>
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};

export const HealthCheckRatingSelection = ({
  setFieldValue, setFieldTouched}: {
    setFieldValue: FormikProps<{ healthCheckRating: HealthCheckRating }>["setFieldValue"];
    setFieldTouched: FormikProps<{ healthCheckRating: HealthCheckRating }>["setFieldTouched"];
  }) => {
    const [selectedRating, setSelectedRating] = useState<number | string>("");
    const field = "healthCheckRating";
    
    const handleChange = (healthRating: number) => {
      setSelectedRating(healthRating);
      setFieldTouched(field, true);
      setFieldValue(field, healthRating);
      console.log(healthRating);
    };

    const ratingOptions = [
      { key: HealthCheckRating.Healthy, text: "Healthy", value: 0 },
      { key: HealthCheckRating.LowRisk, text: "Low Risk", value: 1 },
      { key: HealthCheckRating.HighRisk, text: "High Risk", value: 2 },
      { key: HealthCheckRating.CriticalRisk, text: "Critical Risk", value: 3 },
    ];
    console.log(selectedRating);
    return (
      <FormControl style={{ width: 552, marginBottom: '1em' }}>
          <InputLabel>Health Rating</InputLabel>
          <Select value={selectedRating} onChange={(e) => handleChange(e.target.value as number)} input={<Input />}>
            {ratingOptions.map((option) => (
              <MenuItem key={option.key} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          <ErrorMessage name={field} />
      </FormControl>
    );
};