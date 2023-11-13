import useSideBarContext from "../../hooks/useSideBarContext";
import { Link } from "react-router-dom";

function LineSideBar({ name, text, to }) {
  const { lineState, setLineState } = useSideBarContext();

  return (
    <div
      className={`p-[0.4rem] pl-[2.4rem] w-full text-xs lg:text-xs xl:text-[0.875rem] font-semibold ${
        name === lineState && " bg-secondColor-700"
      }`}
    >
      <Link onClick={() => setLineState(name)} to={to}>
        <span
          className={
            name === lineState
              ? "text-white  font-semibold"
              : "text-themecolor-400"
          }
        >
          {text}
        </span>
      </Link>
    </div>
  );
}

export default LineSideBar;
