import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { formatPhone } from "../../../helpers/formatPhone";
import useUserMobileContext from "../../../hooks/useUserMobileContext";

function CardUserMobile({ user }) {
  const { idUser, setIdUser } = useUserMobileContext();
  return (
    <div
      className={`py-2 text-sm ${
        user.id === idUser && "bg-themecolor-800"
      } transition-[background] duration-75  w-full  text-themecolor-50 border-b border-b-themecolor-800`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="w-[50%] flex items-center mx-[1.1666%]">
          <div className="mr-1.5">
            {user.Office.length > 0 && user.Office[0].image !== null ? (
              <div className="w-7 h-7">
                <img
                  className=" rounded-[50%] "
                  src={user.Office[0].image}
                  alt="LogoCompany"
                />
              </div>
            ) : (
              <FaUserCircle className="w-7 h-7 text-themecolor-300" />
            )}
          </div>
          <span className="line-clamp-2">{user.name}</span>
        </div>

        <div className=" w-[35%] text-xs mx-[1.1666%]">
          {user.Office.length > 0 &&
          !user.Office.some((obj) =>
            Object.entries(obj).some(
              ([key, val]) =>
                key !== "officeWebsite1" &&
                key !== "officeWebsite2" &&
                key !== "officeWebsite3" &&
                (val === null || val === "")
            )
          ) ? (
            <div className="bg-[#388E3C] text-[#fff] rounded px-2 py-[0.100rem] inline-block">
              Completo
            </div>
          ) : user.Office.some((obj) =>
              Object.entries(obj).some(
                ([key, val]) =>
                  key !== "officeWebsite1" &&
                  key !== "officeWebsite2" &&
                  key !== "officeWebsite3" &&
                  (val === null || val === "")
              )
            ) ? (
            <div className="bg-[#FFA000] text-[#fff] rounded px-2 py-[0.100rem] inline-block">
              Incompleto
            </div>
          ) : (
            <div className="bg-[#B00020] text-[#fff] rounded px-2 py-[0.100rem] inline-block">
              Não cadastrado
            </div>
          )}
        </div>
        <div className="w-[8%] mx-[1.1666%] flex justify-center">
          <BsChevronDown
            onClick={() => {
              if (user.id === idUser) {
                setIdUser("");
              } else {
                setIdUser(user.id);
              }
            }}
            className={`transition-all duration-500 ${
              user.id === idUser && "rotate-180 transform "
            }`}
          />
        </div>
      </div>
      <div
        className={`mx-[0.8333%] pt-4 pl-[0.250rem] text-[0.813rem] transition-all duration-500 ${
          user.id === idUser ? " block opacity-100" : "hidden opacity-0"
        }`}
      >
        <div className="flex">
          <span className=" inline-block mr-1 font-medium">Telefone: </span>
          <span className="text-themecolor-300">{formatPhone(user.phone)}</span>
        </div>
        <div className="flex">
          <span className=" inline-block mr-1 font-medium">E-mail: </span>
          <span className="text-themecolor-300">{user.email}</span>
        </div>
        <div className="flex">
          <span className=" inline-block mr-1 font-medium">
            Clientes cadastrados:{" "}
          </span>
          <span className="text-secondColor-200">{user.Customer.length}</span>
        </div>
      </div>
    </div>
  );
}

export default CardUserMobile;
