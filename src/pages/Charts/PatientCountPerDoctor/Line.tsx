import * as d3 from "d3";
import { TBar } from "../../../types";
import { useEffect, useState } from "react";
import {
  calculateAveragePatientCount,
  extractDoctorIDs,
  removeUnnecessaryData,
} from "./functions";

function Line({
  bars,
  xScale,
  yScale,
}: {
  bars: TBar[];
  xScale: any;
  yScale: any;
}) {
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

  const lineGenerator = d3
    .line()
    .x((datum) => {
      return xScale(datum?.data?.data?.doctor_name) + datum?.width;
    })
    .y((_, index) => {
      return yScale(avgPatientCount[index]);
    });

  return (
    <path
      d={lineGenerator(formattedData as Iterable<[number, number]>)!}
      fill="none"
      stroke="purple"
      style={{ pointerEvents: "none", strokeWidth: "1" }}
    />
  );
}

export default Line;
