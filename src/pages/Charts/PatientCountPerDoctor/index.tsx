import { BarCustomLayer, BarDatum, ResponsiveBar } from "@nivo/bar";
import { useState } from "react";
import { TBar, TPatientDoctorDetails } from "../../../types";
import {
  NIVO_BARCHART_DATA,
  PATIENT_COUNT_PER_DOCTOR,
} from "../../../utils/data";
import Line from "./Line";
import ScatterCircle from "./ScatterCircle";

export const CHART_WIDTH = 800;
export const CHART_HEIGHT = 400;

function PatientCountPerDoctor() {
  const [patientDataPerDoctor, _] = useState<TPatientDoctorDetails[]>(
    PATIENT_COUNT_PER_DOCTOR
  );

  const bordercolors = ["#13A413", "#F26622", "#B7C51A", "#9747FF"];
  const selectedDocs = 3;

  const CustomBorder = ({ bars }: { bars: TBar[] }) => {
    // code for vertically stacked bars:
    // return bars.map((bar) => {
    //   const { data, x, y, width, height } = bar;

    //   return (
    //     <g key={bar.key}>
    //       {Object.keys(data).map((key, index) => (
    //         <rect
    //           key={key}
    //           x={x}
    //           y={y + index * (height / Object.keys(data).length)}
    //           width={width}
    //           height={height / Object.keys(data).length}
    //           fill="none"
    //           stroke={bordercolors[index]}
    //           // fill={bordercolors[index]} // Use the same colors as defined in MyBarChart component
    //           // stroke="#000000" // Customize the border color as needed
    //           strokeWidth={1} // Customize the border width as needed
    //         />
    //       ))}
    //     </g>
    //   );
    // });

    const iteration = bars.length / selectedDocs;
    return bars.map((bar) => {
      for (let i = 0; i < iteration; i++) {
        return (
          <>
            <line
              key={bar.key}
              x1={bar.x + bar.width - 1.5}
              y1={bar.y}
              x2={bar.x + bar.width - 1.5}
              y2={bar.y + bar.height}
              stroke={bordercolors[i]}
              strokeWidth={1}
              style={{ pointerEvents: "none" }}
            />
            <line
              key={bar.key}
              x1={bar.x}
              y1={bar.y}
              x2={bar.x + bar.width - 1.5}
              y2={bar.y}
              stroke={"#ed1c24"}
              strokeWidth={1}
              style={{ pointerEvents: "none" }}
            />
            <line
              key={bar.key}
              x1={bar.x}
              y1={bar.y}
              x2={bar.x}
              y2={bar.y + bar.height}
              stroke={"#ed1c24"}
              strokeWidth={1}
              style={{ pointerEvents: "none" }}
            />
            <line
              key={bar.key}
              x1={bar.x}
              y1={bar.y + bar.height}
              x2={bar.x + bar.width - 1.5}
              y2={bar.y + bar.height}
              stroke={"#ed1c24"}
              strokeWidth={1}
              style={{ pointerEvents: "none" }}
            />
          </>
        );
      }
    });
  };

  return (
    <div
      id="barchart"
      style={{ width: `${CHART_WIDTH}px`, height: `${CHART_HEIGHT}px` }}
    >
      <ResponsiveBar
        data={NIVO_BARCHART_DATA}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        // legends={[
        //   {
        //     dataFrom: "indexes",
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 120,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: "left-to-right",
        //     itemOpacity: 0.85,
        //     symbolSize: 20,
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
      />

      <ResponsiveBar
        data={patientDataPerDoctor as unknown as BarDatum[]}
        keys={["week_four", "week_three", "week_two", "week_one"]}
        indexBy="doctor_name"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        fill={[
          {
            match: {
              id: "week_three",
            },
            id: "dots",
          },
          {
            match: {
              id: "week_two",
            },
            id: "lines",
          },
        ]}
        colors={["#EAFFEA", "#FFFAEA", "#FCFFD4", "#FDEAFF"]}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Physicians",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of Patients",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
        layers={[
          "grid",
          "axes",
          "bars",
          ScatterCircle as unknown as BarCustomLayer<BarDatum>,
          Line as unknown as BarCustomLayer<BarDatum>,
          "legends",
          CustomBorder as unknown as BarCustomLayer<BarDatum>,
        ]}
      />
    </div>
  );
}

export default PatientCountPerDoctor;

{
  /* <ResponsiveBar
        data={NIVO_BARCHART_DATA}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
      /> */
}
