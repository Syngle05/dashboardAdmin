import { useEffect } from "react";
import ReactLoading from "react-loading";

function LoadingFull({ size, navBar }) {
  useEffect(() => {
    // Seleciona o elemento pelo ID
    const element = document.getElementById("dashBoardContent");

    if (element) {
      element.style.overflow = "hidden";
    }

    return () => {
      if (element) {
        element.style.overflowY = "scroll";
        element.style.overflowX = "hidden";
      }
    };
  }, []);
  return (
    <div className="absolute inset-0 z-[9999]">
      <div
        className={`${
          navBar
            ? "flex items-center"
            : "sticky w-full h-full inset-0 flex items-center justify-center bg-themecolor-1000 "
        }`}
      >
        <ReactLoading type="spin" color="#03A9F4" height={size} width={size} />
      </div>
    </div>
  );
}

export default LoadingFull;
