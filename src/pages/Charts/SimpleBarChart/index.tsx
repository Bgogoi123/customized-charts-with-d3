import { useEffect, useState } from "react";
import { CHART_HEIGHT, CHART_WIDTH } from "../../../utils/constants";
import { TSimpleChartData } from "../../../types";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../../components/Loader";
import { ResponsiveBar } from "@nivo/bar";

const SimpleBarChart = () => {
  const [simpleChartData, setSimpleChartData] = useState<TSimpleChartData>([]);

  const simpleChartQuery = gql`
    query GetSimpleChartData {
      chartData {
        country
        burger
        burgerColor
        sandwich
        sandwichColor
        kebab
        kebabColor
        fries
        friesColor
        donut
        donutColor
      }
    }
  `;

  const { data, loading } = useQuery(simpleChartQuery);

  useEffect(() => {
    if (data?.chartData?.length > 0) {
      setSimpleChartData(data?.chartData);
    }
  }, [data]);

  return (
    <div style={{ width: `${CHART_WIDTH}px`, height: `${CHART_HEIGHT}px` }}>
      {loading ? (
        <Loader type="text" textContent="Loading Simple Chart..." />
      ) : (
        <ResponsiveBar
          data={simpleChartData}
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
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        />
      )}
    </div>
  );
};

export default SimpleBarChart;
