import axios from "axios";

export const getPatientCount = async () => {
  const res = await axios.get("/patient-count");
  return res;
};
