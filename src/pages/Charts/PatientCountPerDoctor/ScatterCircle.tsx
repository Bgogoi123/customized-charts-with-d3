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

  // console.log("circle formatted data: ", formattedData);

  useEffect(() => {
    if (formattedData.length > 0 && avgPatientCount.length > 0) {
      getChartCoordinates();
    }
  }, [avgPatientCount, formattedData]);

  const getChartCoordinates = () => {
    formattedData.forEach((bar, index) => {
      const xsacle: number = xScale(bar.data.data.doctor_name) + bar.width / 2;
      const ysacle: number = yScale(avgPatientCount[index]);
    });
  };

  return (
    <>
      {formattedData.map((bar: TBar, index) => (
        // Render the circle SVG in chart using Bars co-ordinates.
        <circle
          key={`point-${bar.x}`}
          // Scale x-cordinate of the circle to the center of bar
          cx={xScale(bar.data.data.doctor_name) + bar.width}
          // Scale y-cordinate of the circle to top of the bar
          cy={yScale(avgPatientCount[index])}
          r={3}
          fill="black"
          stroke="black"
          style={{ pointerEvents: "none" }}
        />
      ))}
    </>
  );

  // return (
  //   <>
  //     {bars.map((bar: any) => (
  //       // Render the circle SVG in chart using Bars co-ordinates.
  //       <circle
  //         key={`point-${bar.x}`}
  //         // Scale x-cordinate of the circle to the center of bar
  //         cx={xScale(bar.data.index) + bar.width / 2}
  //         // Scale y-cordinate of the circle to top of the bar
  //         cy={yScale(bar.data.data.v + 0.2)}
  //         r={3}
  //         fill="black"
  //         stroke="black"
  //         style={{ pointerEvents: "none" }}
  //       />
  //     ))}
  //   </>
  // );
};

export default ScatterCircle;
