import * as d3 from "d3";
import { useEffect, useState } from "react";
import { CHART_WIDTH } from ".";
import { TBar } from "../../../types";
import { TLineCircleProps } from "../../../types/props";
import {
  calculateAveragePatientCount,
  createLineData,
  extractDoctorIDs,
  formatLineData,
} from "./functions";

function Line({ bars, xScale, yScale }: TLineCircleProps) {
  const [doctorIds, setDoctorIds] = useState<number[]>([]);
  const [formattedData, setFormattedData] = useState<TBar[]>([]);
  const [avgPatientCount, setAvgPatientCount] = useState<number[]>([]);
  const [lineData, setLineData] = useState<[number, number][]>([]);
  const [dataWidth, setDataWidth] = useState<number[]>([0]);

  const lineGenerator = d3
    .line()
    .x((datum, index) => {
      return xScale(datum[0]) === undefined && index === 0
        ? 0
        : xScale(datum[0]) === undefined && index === formattedData.length - 1
        ? CHART_WIDTH - 200
        : xScale(datum[0]) + dataWidth[index] + 20;
    })
    .y((_, index) => {
      return yScale(avgPatientCount[index]);
    })
    .curve(d3.curveBumpX);

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

  useEffect(() => {
    createLineData({
      formattedData,
      setDataWidth,
      setLineData,
      avgPatientCount,
    });
  }, [formattedData, avgPatientCount]);

  return (
    <>
      <path
        d={lineGenerator(lineData) as string}
        fill="none"
        stroke="purple"
        style={{ pointerEvents: "none", strokeWidth: "1" }}
      />
    </>
  );
}

export default Line;
