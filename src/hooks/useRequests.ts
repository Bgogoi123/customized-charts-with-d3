import { GraphQLClient } from "graphql-request";
import { useQuery } from "react-query";
import { graphql } from "../../gql";

const graphQLClient = new GraphQLClient(import.meta.env.BASE_URL);

export function useGetPatientCount() {
  return useQuery("patient-count", async () => {
    const { patientCountData } = await graphQLClient.request(
      graphql(`
        query GetPatientCountData {
          patientCountData {
            doctor_email
            doctor_id
            doctor_name
            doctor_phone
            week_one
            week_two
            week_three
            week_four
          }
        }
      `)
    );
    return patientCountData;
  });
}
// const { patientCountData }: { patientCountData: TPatientDoctorDetails[] } =
//   await graphQLClient.request(gql`
//     query GetPatientCountData {
//       patientCountData {
//         doctor_email
//         doctor_id
//         doctor_name
//         doctor_phone
//         week_one
//         week_two
//         week_three
//         week_four
//       }
//     }
//   `);
// return patientCountData;

export function useGetSimpleChartData() {
  return useQuery("simple-chart-data", async () => {
    const { chartData } = await graphQLClient.request(
      graphql(`
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
      `)
    );
    return chartData;
  });
}

// export const chartQuery: any = gql`
//   query GetSimpleChartData {
//     chartData {
//       country
//       burger
//       burgerColor
//       sandwich
//       sandwichColor
//       kebab
//       kebabColor
//       fries
//       friesColor
//       donut
//       donutColor
//     }
//   }
// `;

// export const chartQueryTwo: { key: any; query: any } = {
//   key: "simple-chart-data",
//   query: gql`
//     query GetSimpleChartData {
//       chartData {
//         country
//         burger
//         burgerColor
//         sandwich
//         sandwichColor
//         kebab
//         kebabColor
//         fries
//         friesColor
//         donut
//         donutColor
//       }
//     }
//   `,
// };

// const { key, query }: any = chartQueryTwo;

// const { chartdata }: any = executeQuery(key, query);

// await graphQLClient.request(gql`
//   query GetSimpleChartData {
//     chartData {
//       country
//       burger
//       burgerColor
//       sandwich
//       sandwichColor
//       kebab
//       kebabColor
//       fries
//       friesColor
//       donut
//       donutColor
//     }
//   }
// `);
