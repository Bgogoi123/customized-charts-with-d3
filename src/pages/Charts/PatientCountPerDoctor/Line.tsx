import * as d3 from "d3";
import { TBar } from "../../../types";
import { useEffect, useState } from "react";
import {
  calculateAveragePatientCount,
  createLineData,
  extractDoctorIDs,
  removeUnnecessaryData,
} from "./functions";
import { CHART_HEIGHT, CHART_WIDTH } from ".";

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
  const [redefinedPathDirection, setRedefinedPathDirection] =
    useState<string>("");

  const lineGenerator = d3
    .line()
    .x((datum, index) => {
      return xScale(datum[0]) + dataWidth[index];
    })
    .y((_, index) => {
      return yScale(avgPatientCount[index]);
    })
    .curve(d3.curveBumpX);

  useEffect(() => {
    if (lineGenerator !== undefined && lineGenerator !== null) {
      redefinePathDirection();
    }
  }, [lineGenerator]);

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

  function redefinePathDirection() {
    const pathDir = lineGenerator(lineData)?.split("M");
    if (pathDir !== undefined) {
      const first = `M0,${CHART_HEIGHT - 100},C0,${CHART_HEIGHT - 100},10,220,`;
      const lastElems = pathDir[1].split(",");
      const lastElemX = lastElems[lastElems.length - 2];
      const lastElemY = lastElems[lastElems.length - 1];
      const lastDir = `,M${lastElemX},${lastElemY},${CHART_WIDTH - 200},${
        CHART_HEIGHT - 100
      }`;
      let newDir = first + pathDir[1] + lastDir;
      setRedefinedPathDirection(newDir);
    }
  }

  return (
    <path
      d={redefinedPathDirection}
      fill="none"
      stroke="purple"
      style={{ pointerEvents: "none", strokeWidth: "1" }}
    />
  );
}

export default Line;

{
  /* <path
    // d={lineGenerator(lineData)!}
    d={`M0,${bars[0].height}L59.75,170C121.75,170,121.75,235,183.75,235C245.75,235,245.75,180,307.75,180`}
    fill="none"
    stroke="purple"
    style={{ pointerEvents: "none", strokeWidth: "1" }}
  /> */
}
