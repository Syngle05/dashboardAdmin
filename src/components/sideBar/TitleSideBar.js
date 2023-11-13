import useSideBarContext from "../../hooks/useSideBarContext";
import { BsBuildings } from "react-icons/bs";
function TitleSideBar({ text, name, icon }) {
  const { titleState, setTitleState, isExpanded, toggleSidebar } =
    useSideBarContext();

  return (
    <div
      onClick={() =>
        !isExpanded
          ? toggleSidebar()
          : titleState === name
          ? setTitleState("")
          : setTitleState(name)
      }
      className={`${
        !isExpanded && "justify-center"
      } flex items-center transition-all duration-100 ${
        name === titleState && isExpanded && " bg-themecolor-800"
      }`}
    >
      {icon && (
        <BsBuildings
          className={`${
            !isExpanded ? "mx-0 mt-[1.2rem]" : "mx-[0.4rem]"
          } transition-all xl:text-[1.4rem] lg:text-[1.275rem]  ${
            name === titleState
              ? " text-secondColor-500 "
              : "text-themecolor-400"
          }`}
        />
      )}
      {isExpanded && (
        <h3
          className={`  w-full p-[0.4rem] lg:text-sm xl:text-base mx-0 font-medium pl-0 my-2 transition-all  ${
            name === titleState
              ? " text-secondColor-500 "
              : "text-themecolor-400"
          }`}
        >
          {text}
        </h3>
      )}
    </div>
  );
}

export default TitleSideBar;
