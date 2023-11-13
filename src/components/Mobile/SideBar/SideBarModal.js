import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Modal from "react-modal";
import DivSideBar from "../../sideBar/DivSideBar";
import LineSideBar from "../../sideBar/LineSideBar";
import TitleSideBar from "../../sideBar/TitleSideBar";
import logoBh2 from "../../../img/vecteezy_circle-logo_1191986.png";
function SideBarModal({ modalIsOpen, closeModal }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="sideBar modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0 ,0, 0.8)",
          zIndex: "100",
        },
        content: {
          borderTop: "0",
          borderBottom: "0",
          borderLeft: "0",
          borderRight: "1px solid #424242",
          borderRadius: "0",
          backgroundColor: "#212121",
          margin: "0",
          top: "0",
          left: "0",
          padding: "1rem 0 1rem 0",
          width: "80%",
          height: "100%",
          overflowY: "hidden",
        },
      }}
    >
      <div className={` h-20 flex justify-center items-center w-full  mb-4`}>
        <img src={logoBh2} alt="Logo" className="h-20" />
      </div>
      <div className="border-t border-t-themecolor-800">
        <TitleSideBar
          text="ePlataforma"
          name="ePlataforma"
          icon="ePlataforma"
        />

        <DivSideBar divName="ePlataforma">
          <LineSideBar text="Usuarios" to="/" name="user" />
          <LineSideBar text="Pedidos" to="/orders" name="orders" />
        </DivSideBar>
      </div>
      <div onClick={closeModal} className=" absolute bottom-2 z-[99] right-4 ">
        <BsFillArrowLeftCircleFill className=" text-secondColor-100 text-3xl " />
      </div>
    </Modal>
  );
}

export default SideBarModal;
