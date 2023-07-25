import { BarCustomLayer, BarDatum, ResponsiveBar } from "@nivo/bar";
import Loader from "../../../components/Loader";
import { useGetPatientCount } from "../../../hooks/useRequests";
import { CHART_HEIGHT, CHART_WIDTH } from "../../../utils/constants";
import { CustomBorder } from "./CustomBorder";
import Line from "./Line";
import ScatterCircle from "./ScatterCircle";
import Error from "../../../components/Error";

function PatientCountPerDoctor() {
  // hooks
  const { data, isLoading } = useGetPatientCount();

  return (
    <div
      id="barchart"
      style={{ width: `${CHART_WIDTH}px`, height: `${CHART_HEIGHT}px` }}
    >
      {isLoading ? (
        <Loader type="text" textContent="Loading Composite Chart..." />
      ) : data?.length! <= 0 ? (
        <Error errorMessage="Oops! Couldn't load data." />
      ) : (
        <ResponsiveBar
          data={data as unknown as BarDatum[]}
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
      )}
    </div>
  );
}

export default PatientCountPerDoctor;
