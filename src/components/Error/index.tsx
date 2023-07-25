const Error = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <h3 style={{ color: "darkred", textAlign: "center" }}>{errorMessage}</h3>
  );
};

export default Error;
