import { Tooltip } from "react-tooltip";

function TooltipComponent({ id, style }) {
  return (
    <Tooltip
      noArrow
      id={id}
      style={{
        padding: "0.35rem 0.5rem",
        borderRadius: "3px",
        fontSize: "0.8rem",
        fontWeight: "600",
        backgroundColor: "#424242",
        color: "white",
      }}
    />
  );
}

export default TooltipComponent;
