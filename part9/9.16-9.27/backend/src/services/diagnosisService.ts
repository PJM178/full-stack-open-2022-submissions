import diagnosesData from '../../data/diagnoses.json';
import { DiagnosisEntry } from '../types';

const diagnoses: DiagnosisEntry[] = diagnosesData;

const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default {
  getEntries
};