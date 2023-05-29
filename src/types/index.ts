export type TPatientDetails = {
  patient_id: string;
  patient_name: string;
  patient_gender: string;
  patient_age: number;
  patient_phone: number;
  patient_email: string;
  disease: string;
  diagnosis: string;
};

export type TPatientCount = {
  week_one: TPatientDetails[];
  week_two: TPatientDetails[];
  week_three: TPatientDetails[];
  week_four: TPatientDetails[];
};

export type TDoctorDetails = {
  id: number;
  doctor_name: string;
  doctor_email: string;
  doctor_phone: number;
  patient_count: TPatientCount;
};

export type TPatientDoctorDetails = {
  doctor_id: number;
  doctor_name: string;
  doctor_email: string;
  doctor_phone: number;
  week_one: number;
  week_two: number;
  week_three: number;
  week_four: number;
};

export type TPatientCountPerDoctor = TPatientDoctorDetails[];

type TBarsNestedData = TPatientDoctorDetails;

type TBarsData = {
  data: TBarsNestedData;
  formattedValue: string;
  hidden: boolean;
  id: string;
  index: number;
  indexValue: string;
  value: number;
};

export type TBar = {
  absX: number;
  absY: number;
  color: string;
  data: TBarsData;
  height: number;
  index: number;
  key: string;
  label: string;
  width: number;
  x: number;
  y: number;
};
