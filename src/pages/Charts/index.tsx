import PatientCountPerDoctor from "./PatientCountPerDoctor";
import SimpleBarChart from "./SimpleBarChart";

const Charts = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SimpleBarChart />
      <PatientCountPerDoctor />
    </div>
  );
};

export default Charts;
