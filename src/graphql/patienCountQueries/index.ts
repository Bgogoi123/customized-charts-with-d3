import { gql } from "@apollo/client";

export const patientCountQuery = {
  key: "patient-count",
  query: gql`
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
  `,
};
