const Loader = ({
  type,
  textContent,
}: {
  type: "text" | "icon";
  textContent?: string;
}) => {
  if (type === "text") {
    return (
      <h3 style={{ color: "blueviolet", textAlign: "center" }}>
        {textContent}
      </h3>
    );
  }
  return <p>O</p>;
};

export default Loader;
