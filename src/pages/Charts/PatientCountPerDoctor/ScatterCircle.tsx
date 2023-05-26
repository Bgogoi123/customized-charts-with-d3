import { useEffect, useState } from "react";
import { TBar } from "../../../types";
import {
  calculateAveragePatientCount,
  extractDoctorIDs,
  removeUnnecessaryData,
} from "./functions";

const ScatterCircle = ({
  bars,
  xScale,
  yScale,
}: {
  bars: TBar[];
  xScale: any;
  yScale: any;
}) => {
  const [doctorIds, setDoctorIds] = useState<number[]>([]);
  const [formattedData, setFormattedData] = useState<TBar[]>([]);
  const [avgPatientCount, setAvgPatientCount] = useState<number[]>([]);

  useEffect(() => {
    extractDoctorIDs({
      bars,
      setDoctorIds,
    });
  }, [bars]);

  useEffect(() => {
    removeUnnecessaryData({
      doctorIds,
      bars,
      setFormattedData,
    });
  }, [doctorIds]);

  useEffect(() => {
    calculateAveragePatientCount({
      formattedData,
      setAvgPatientCount,
    });
  }, [formattedData]);

  return (
    <>
      {formattedData.map((bar: TBar, index) => (
        <circle
          id={`dot_${index}`}
          key={`point-${bar.x}`}
          cx={xScale(bar.data.data.doctor_name) + bar.width}
          cy={yScale(avgPatientCount[index])}
          r={3}
          fill="black"
          stroke="black"
          style={{ pointerEvents: "none" }}
        />
      ))}
    </>
  );
};

export default ScatterCircle;
