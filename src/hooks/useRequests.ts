import { gql } from "@apollo/client";
import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";
import { TPatientDoctorDetails } from "../types";

export function useGetPatientCount() {
  const graphQLClient = new GraphQLClient("http://127.0.0.1:5174/");

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
