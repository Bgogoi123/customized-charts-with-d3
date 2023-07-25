import { TBar } from "../../../types";

export const CustomBorder = ({ bars }: { bars: TBar[] }) => {
  const bordercolors = ["#13A413", "#F26622", "#B7C51A", "#9747FF"];
  const selectedDocs = 3;
  // code for vertically stacked bars:
  // return bars.map((bar) => {
  //   const { data, x, y, width, height } = bar;

  //   return (
  //     <g key={bar.key}>
  //       {Object.keys(data).map((key, index) => (
  //         <rect
  //           key={key}
  //           x={x}
  //           y={y + index * (height / Object.keys(data).length)}
  //           width={width}
  //           height={height / Object.keys(data).length}
  //           fill="none"
  //           stroke={bordercolors[index]}
  //           // fill={bordercolors[index]} // Use the same colors as defined in MyBarChart component
  //           // stroke="#000000" // Customize the border color as needed
  //           strokeWidth={1} // Customize the border width as needed
  //         />
  //       ))}
  //     </g>
  //   );
  // });

  const iteration = bars.length / selectedDocs;
  return bars.map((bar, barIndex) => {
    for (let i = 0; i < iteration; i++) {
      return (
        <g key={barIndex}>
          <line
            // key={bar.key}
            x1={bar.x + bar.width - 1.5}
            y1={bar.y}
            x2={bar.x + bar.width - 1.5}
            y2={bar.y + bar.height}
            stroke={bordercolors[i]}
            strokeWidth={1}
            style={{ pointerEvents: "none" }}
          />
          <line
            // key={bar.key}
            x1={bar.x}
            y1={bar.y}
            x2={bar.x + bar.width - 1.5}
            y2={bar.y}
            stroke={"#ed1c24"}
            strokeWidth={1}
            style={{ pointerEvents: "none" }}
          />
          <line
            // key={bar.key}
            x1={bar.x}
            y1={bar.y}
            x2={bar.x}
            y2={bar.y + bar.height}
            stroke={"#ed1c24"}
            strokeWidth={1}
            style={{ pointerEvents: "none" }}
          />
          <line
            // key={bar.key}
            x1={bar.x}
            y1={bar.y + bar.height}
            x2={bar.x + bar.width - 1.5}
            y2={bar.y + bar.height}
            stroke={"#ed1c24"}
            strokeWidth={1}
            style={{ pointerEvents: "none" }}
          />
        </g>
      );
    }
  });
};
