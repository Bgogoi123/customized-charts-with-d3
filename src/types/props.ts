import { TBar } from ".";

export type TLineCircleProps = {
  bars: TBar[];
  xScale: any;
  yScale: any;
};

export type TExtractDoctorIDProps = {
  bars: TBar[];
  setDoctorIds: (value: React.SetStateAction<number[]>) => void;
};

export type TFormatLineDataProps = {
  doctorIds: number[];
  bars: TBar[];
  setFormattedData: (value: React.SetStateAction<TBar[]>) => void;
};

export type TCalculateAveragePatientCount = {
  formattedData: TBar[];
  setAvgPatientCount: (value: React.SetStateAction<number[]>) => void;
};

export type TCreateLineDataProps = {
  formattedData: TBar[];
  setLineData: (value: React.SetStateAction<[number, number][]>) => void;
  setDataWidth: (value: React.SetStateAction<number[]>) => void;
  avgPatientCount: number[];
};
