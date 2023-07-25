import { TBar, TPatientDoctorDetails } from "../../../types";
import {
  TCalculateAveragePatientCount,
  TCreateLineDataProps,
  TExtractDoctorIDProps,
  TFormatLineDataProps,
} from "../../../types/props";
import { CHART_WIDTH } from "../../../utils/constants";

export const extractDoctorIDs = ({
  bars,
  setDoctorIds,
}: TExtractDoctorIDProps) => {
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

export const formatLineData = ({
  doctorIds,
  bars,
  setFormattedData,
}: TFormatLineDataProps) => {
  if (doctorIds.length > 0) {
    const sliced: TBar[] = bars.slice(0, doctorIds.length);

    const initialBar: TBar = {
      absX: 0,
      absY: 0,
      color: "none",
      data: {
        data: {
          doctor_email: "",
          doctor_id: 0,
          doctor_name: "",
          doctor_phone: 0,
          week_four: 0,
          week_one: 0,
          week_three: 0,
          week_two: 0,
        },
        formattedValue: "0",
        hidden: true,
        id: "",
        index: 0,
        indexValue: "0",
        value: 0,
      },
      height: 0,
      index: 0,
      key: "",
      label: "",
      width: 21.75,
      x: 0,
      y: 0,
    };

    const finalBar: TBar = {
      absX: 0,
      absY: 0,
      color: "none",
      data: {
        data: {
          doctor_email: "",
          doctor_id: 0,
          doctor_name: "",
          doctor_phone: 0,
          week_four: 0,
          week_one: 0,
          week_three: 0,
          week_two: 0,
        },
        formattedValue: "0",
        hidden: true,
        id: "",
        index: sliced.length + 1,
        indexValue: `${CHART_WIDTH - 200}`,
        value: CHART_WIDTH - 200,
      },
      height: 0,
      index: sliced.length + 1,
      key: "",
      label: "",
      width: 21.75,
      x: CHART_WIDTH - 200,
      y: 0,
    };

    const modifiedBars = sliced.map((slice) => {
      return {
        absX: slice.absX,
        absY: slice.absY,
        color: slice.color,
        data: {
          data: {
            doctor_email: slice.data.data.doctor_email,
            doctor_id: slice.data.data.doctor_id,
            doctor_name: slice.data.data.doctor_name,
            doctor_phone: slice.data.data.doctor_phone,
            week_four: slice.data.data.week_four,
            week_three: slice.data.data.week_three,
            week_two: slice.data.data.week_two,
            week_one: slice.data.data.week_one,
          },
          formattedValue: slice.data.formattedValue,
          hidden: slice.data.hidden,
          id: slice.data.id,
          index: slice.data.index + 1,
          indexValue: slice.data.indexValue,
          value: slice.data.value,
        },
        height: slice.height,
        index: slice.index + 1,
        key: slice.key,
        label: slice.label,
        width: slice.width,
        x: slice.x,
        y: slice.y,
      };
    });

    setFormattedData([initialBar, ...modifiedBars, finalBar]);
  }
};

export const calculateAveragePatientCount = ({
  formattedData,
  setAvgPatientCount,
}: TCalculateAveragePatientCount) => {
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
        let temp = [...prev, isNaN(average) ? 0 : average];
        return temp;
      });
    });
  }
};

export const createLineData = ({
  formattedData,
  setDataWidth,
  setLineData,
  avgPatientCount,
}: TCreateLineDataProps) => {
  if (formattedData.length > 0) {
    setLineData([]);
    setDataWidth([]);
    formattedData.forEach((datum, index) => {
      setLineData((prev) => {
        let temp: (string | number)[][];

        if (index === formattedData.length - 1) {
          temp = [...prev, [CHART_WIDTH - 200, avgPatientCount[index]]];
          return temp as [number, number][];
        } else if (index === 0) {
          temp = [...prev, [0, avgPatientCount[index]]];
          return temp as [number, number][];
        } else {
          temp = [
            ...prev,
            [datum?.data?.data?.doctor_name, avgPatientCount[index]],
          ];
          return temp as [number, number][];
        }
      });
      setDataWidth((prev) => {
        let temp = [...prev, datum.width];
        return temp;
      });
    });
  }
};
