import * as d3 from "d3";
import { TBar } from "../../../types";
import { useEffect, useState } from "react";
import {
  calculateAveragePatientCount,
  createLineData,
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
  const [lineData, setLineData] = useState<[number, number][]>([]);
  const [dataWidth, setDataWidth] = useState<number[]>([0]);

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

  useEffect(() => {
    createLineData({
      formattedData,
      setDataWidth,
      setLineData,
      avgPatientCount,
    });
  }, [formattedData, avgPatientCount]);

  const lineGenerator = d3
    .line()
    .x((datum, index) => {
      console.log(datum[0]);
      return xScale(datum[0]) + dataWidth[index];
    })
    .y((_, index) => {
      return yScale(avgPatientCount[index]);
    })
    .curve(d3.curveBumpX);

  return (
    <path
      d={lineGenerator(lineData)!}
      fill="none"
      stroke="purple"
      style={{ pointerEvents: "none", strokeWidth: "1" }}
    />
  );
}

export default Line;
