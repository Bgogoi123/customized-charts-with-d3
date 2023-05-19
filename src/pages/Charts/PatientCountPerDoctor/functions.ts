import { TBar, TPatientDoctorDetails } from "../../../types";

export const extractDoctorIDs = ({
  bars,
  setDoctorIds,
}: {
  bars: TBar[];
  setDoctorIds: (value: React.SetStateAction<number[]>) => void;
}) => {
  if (bars.length > 0) {
    bars.forEach((bar) => {
      const doctor_id: number = bar.data.data.doctor_id;
      setDoctorIds((prev) => {
        const checkPresence = [...prev].some(
          (element) => element === doctor_id
        );
        if (!checkPresence) {
          let temp = [...prev, doctor_id];
          return temp;
        }
        return prev;
      });
    });
  }
};

export const removeUnnecessaryData = ({
  doctorIds,
  bars,
  setFormattedData,
}: {
  doctorIds: number[];
  bars: TBar[];
  setFormattedData: (value: React.SetStateAction<TBar[]>) => void;
}) => {
  if (doctorIds.length > 0) {
    const sliced = bars.slice(0, doctorIds.length);
    setFormattedData(sliced);
  }
};

export const calculateAveragePatientCount = ({
  formattedData,
  setAvgPatientCount,
}: {
  formattedData: TBar[];
  setAvgPatientCount: (value: React.SetStateAction<number[]>) => void;
}) => {
  if (formattedData.length > 0) {
    setAvgPatientCount([]);
    formattedData.forEach((datum) => {
      const details: TPatientDoctorDetails = datum?.data?.data;
      const average =
        (details?.week_one +
          details?.week_two +
          details?.week_three +
          details?.week_four) /
        4;
      setAvgPatientCount((prev) => {
        let temp = [...prev, average];
        return temp;
      });
    });
  }
};
