import { useEffect, useState } from "react";
import { TBar } from "../../../types";
import {
  calculateAveragePatientCount,
  extractDoctorIDs,
  formatLineData,
} from "./functions";
import { TLineCircleProps } from "../../../types/props";
import { CHART_WIDTH } from "../../../utils/constants";

const ScatterCircle = ({ bars, xScale, yScale }: TLineCircleProps) => {
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
    formatLineData({
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
      {formattedData.map((bar: TBar, index) => {
        const cx = xScale(bar.data.data.doctor_name) + bar.width + 20;
        return (
          <circle
            id={`dot_${index}`}
            key={`point-${bar.x}`}
            cx={
              isNaN(cx) && index === 0
                ? 0
                : isNaN(cx) && index === formattedData.length - 1
                ? CHART_WIDTH - 200
                : cx
            }
            cy={yScale(avgPatientCount[index])}
            r={3}
            fill="black"
            stroke="black"
            style={{ pointerEvents: "none" }}
          />
        );
      })}
    </>
  );
};

export default ScatterCircle;
