import axios from "axios";

export const getPatientCount = async () => {
  const res = (await axios.get("/patient-count")).data({
    query: `{GetPatientCountData {
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
    }}`,
  });
  return res;
};
