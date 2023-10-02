import React, { useEffect, useState } from "react";
import logoBh2 from "../../img/vecteezy_circle-logo_1191986.png";
import { BsList } from "react-icons/bs";
import SideBarModal from "./SideBarModal";

function NavBar() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const div = document.getElementById("dashBoardContent");
    if (div) {
      div.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (div) {
        div.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollPos]);

  const handleScroll = (e) => {
    const currentScrollPos = e.target.scrollTop;
    const visible = scrollPos > currentScrollPos;

    setScrollPos(currentScrollPos);
    setShowNav(visible);
  };

  function closeModal() {
    setIsOpenModal(false);
  }
  return (
    <nav
      className={`z-50 transition-all duration-[0.8s] py-1 items-center right-0 left-0 bg-themecolor-1000 px-8 flex absolute  ${
        showNav ? "top-0 " : "-top-[calc(10vh+0.5rem)]"
      } h-[calc(10vh+0.5rem)]  justify-between `}
    >
      <SideBarModal modalIsOpen={isOpenModal} closeModal={closeModal} />
      <div onClick={() => setIsOpenModal(true)}>
        {" "}
        <BsList className="text-secondColor-900 text-3xl" />
      </div>
      <div className={` h-full flex justify-center items-center `}>
        <img src={logoBh2} alt="Logo" className="h-full" />
      </div>
      <div></div>
    </nav>
  );
}

export default NavBar;
