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
  const [endingPath, setEndingPath] = useState<string>("");

  const lineGenerator = d3
    .line()
    .x((datum, index) => {
      return xScale(datum[0]) + dataWidth[index] + 20;
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

      let newDir = first + pathDir[1];
      setRedefinedPathDirection(newDir);
      // setEndingPath(
      //   `M${lastElemX},${lastElemY}
      //   C${lastElemX},${parseInt(lastElemY) + 10},
      //   ${lastElemX},${parseInt(lastElemY) + 100},
      //   ${CHART_WIDTH - 200},${CHART_HEIGHT - 100}`
      // );

      // setEndingPath("M307.75,144 C350,150 400,250 420,300");
      // M lX,lY
      // C lX+40, lY+6
      // WIDTH, (lY+6)+100
      // WIDTH+20, HEIGHT

      // last working code:
      // setEndingPath(`
      // M${lastElemX},${lastElemY}C${parseInt(lastElemX) + 40},${
      //   parseInt(lastElemY) + 6
      // },${CHART_WIDTH - 200},${parseInt(lastElemY) + 6 + 100},${
      //   CHART_WIDTH - 200
      // },${CHART_HEIGHT - 100}`);

      // experimenting:
      const x2 = (
        parseInt(lastElemX) +
        (CHART_WIDTH - 200 - parseInt(lastElemX)) / 3
      ).toFixed(2);
      const y2 = (
        parseInt(lastElemY) +
        (CHART_HEIGHT - 100 - parseInt(lastElemY)) / 3
      ).toFixed(2);
      const x3 = (
        parseInt(lastElemX) +
        (2 * (CHART_WIDTH - 200 - parseInt(lastElemX))) / 3
      ).toFixed(2);
      const y3 = (
        parseInt(lastElemY) +
        (2 * (CHART_HEIGHT - 100 - parseInt(lastElemY))) / 3
      ).toFixed(2);

      // console.log(x2, y2, x3, y3);

      setEndingPath(
        `M${lastElemX},${lastElemY},C${x2},${y2},${x3},${y3},${
          CHART_WIDTH - 200
        },${CHART_HEIGHT - 100}`
      );
    }
  }

  return (
    <>
      <path
        d={redefinedPathDirection}
        fill="none"
        stroke="purple"
        style={{ pointerEvents: "none", strokeWidth: "1" }}
      />
      <path
        d={endingPath}
        fill="none"
        stroke="purple"
        style={{ pointerEvents: "none", strokeWidth: "1" }}
      />
    </>
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
