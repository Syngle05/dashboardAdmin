import useSideBarContext from "../hooks/useSideBarContext";
import NavBar from "./Mobile/NavBar/NavBar";
import SideBar from "./SideBar";
import { useMediaQuery } from "react-responsive";

function DashBoard({ children }) {
  const lg = useMediaQuery({ query: "(min-width: 1024px)" });

  const { isExpanded } = useSideBarContext();
  return (
    <div className=" bg-themecolor-1000 ">
      {!lg && <NavBar />}
      <div className="flex justify-between w-full h-[100vh]">
        {lg && <SideBar />}
        <div
          className={`${
            isExpanded && lg
              ? "w-[85%]"
              : !isExpanded && lg
              ? "w-[95%]"
              : "w-full"
          } ${
            !lg && "pt-[calc(10vh+0.5rem)]"
          } overflow-y-scroll overflow-x-hidden relative transition-[width] duration-[0.5s]`}
          id="dashBoardContent"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
