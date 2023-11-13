import "./sideBar.css";
import logoBh2 from "../img/vecteezy_circle-logo_1191986.png";
import TitleSideBar from "./sideBar/TitleSideBar";
import DivSideBar from "./sideBar/DivSideBar";
import LineSideBar from "./sideBar/LineSideBar";
import useSideBarContext from "../hooks/useSideBarContext";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
function SideBar() {
  const { isExpanded, toggleSidebar } = useSideBarContext();
  return (
    <div
      className={`${
        isExpanded ? "w-[15%]" : "w-[5%]"
      } bg-themecolor-900  border-r  transition-[width] duration-[0.5s] border-r-themecolor-800  scrollbar h-full inline-block overflow-y-scroll relative overflow-x-hidden break-words py-4 capitalize scroll`}
    >
      <div className={` h-20 flex justify-center items-center w-full  mb-4`}>
        <img
          src={logoBh2}
          alt="Logo"
          className={isExpanded ? "lg:h-[4.5rem] xl:h-20" : "lg:h-10 xl:h-12"}
        />
      </div>
      <div className="border-t border-t-themecolor-800">
        <TitleSideBar
          text="ePlataforma"
          name="ePlataforma"
          icon="ePlataforma"
        />
        {isExpanded && (
          <DivSideBar divName="ePlataforma">
            <LineSideBar text="Usuarios" to="/" name="user" />
            <LineSideBar text="Pedidos" to="/orders" name="orders" />
          </DivSideBar>
        )}
      </div>
      <div
        onClick={toggleSidebar}
        className=" absolute bottom-2 z-[99] right-4 "
      >
        {isExpanded ? (
          <BsFillArrowLeftCircleFill className=" text-secondColor-100 text-3xl " />
        ) : (
          <BsFillArrowRightCircleFill className=" text-secondColor-100 text-3xl" />
        )}
      </div>
    </div>
  );
}

export default SideBar;
