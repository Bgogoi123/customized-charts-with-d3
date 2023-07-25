import { gql } from "@apollo/client";
import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";
import { TPatientDoctorDetails, TSimpleChartData } from "../types";

const graphQLClient = new GraphQLClient(import.meta.env.BASE_URL);

export function useGetPatientCount() {
  return useQuery("get-patient-count", async () => {
    const { patientCountData }: { patientCountData: TPatientDoctorDetails[] } =
      await graphQLClient.request(gql`
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
      `);
    return patientCountData;
  });
}

export function useGetSimpleChartData() {
  return useQuery("get-simple-chart-data", async () => {
    const { chartData }: { chartData: TSimpleChartData } =
      await graphQLClient.request(gql`
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
      `);
    return chartData;
  });
}
