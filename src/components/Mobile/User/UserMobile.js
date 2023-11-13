import React from "react";
import UserMobileProvider from "../../../context/userMobileContext/UserMobileProvide";
import CardUserMobile from "./CardUserMobile";

function UserMobile({ users }) {
  return (
    <>
      <div>
        <h2 className=" text-lg text-themecolor-100">Lista de Usuários</h2>
      </div>
      <div className="w-full">
        <div className="w-full flex justify-between items-center  text-xs mb-4 mt-4">
          <div className="w-[50%] mx-[1.1666%]">
            <span>Usuário</span>
          </div>

          <div className=" w-[35%] mx-[1.1666%]">
            <span>Perfil do escritorio</span>
          </div>
          <div className="w-[8%] mx-[1.1666%]"></div>
        </div>
        <UserMobileProvider>
          {users &&
            users.map((user) => <CardUserMobile user={user} key={user.id} />)}
        </UserMobileProvider>
      </div>
    </>
  );
}

export default UserMobile;
