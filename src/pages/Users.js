import React, { useEffect, useState } from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import LoadingFull from "../components/LoadingFull";
import { formatPhone } from "../helpers/formatPhone";
import { getAllUsers } from "../services/users";
import { toast } from "react-toastify";

function Users() {
  const [users, setUsers] = useState();
  const [customerLength, setCustomerLength] = useState();
  const [loading, setLoading] = useState(true);
  const [newUserCount, setNewUserCount] = useState(0);
  const [newClientCount, setNewClientCount] = useState(0);
  const [spin, setSpin] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (customerLength && users) {
      loadNotification();
    }
  }, [users, customerLength]);

  async function loadUsers() {
    const data = await getAllUsers();
    setUsers(data);
    let customers = 0;
    data.forEach((customer) => (customers += customer.Customer.length));
    setCustomerLength(customers);
  }

  function loadNotification() {
    let lastVisit = localStorage.getItem("lastVisit");
    let lastUserCount = localStorage.getItem("lastUserCount");
    let lastClientCount = localStorage.getItem("lastClientCount");
    if (!lastVisit) {
      console.log(users);
      let currentUserCount = users.length;
      let currentClientCount = customerLength;

      localStorage.setItem("lastVisit", new Date().toISOString());
      localStorage.setItem("lastUserCount", currentUserCount);
      localStorage.setItem("lastClientCount", currentClientCount);
    } else {
      let lastVisitDate = new Date(lastVisit);
      let today = new Date();

      if (today.toDateString() !== lastVisitDate.toDateString()) {
        console.log(users);
        let currentUserCount = users.length;
        let currentClientCount = customerLength;

        let newUserCount = currentUserCount - lastUserCount;
        let newClientCount = currentClientCount - lastClientCount;

        setNewUserCount(newUserCount);
        setNewClientCount(newClientCount);

        localStorage.setItem("lastVisit", today.toISOString());
        localStorage.setItem("lastUserCount", currentUserCount);
        localStorage.setItem("lastClientCount", currentClientCount);
      }
    }
    setLoading(false);
  }

  function resetData() {
    setSpin(true);
    setKey((prevKey) => prevKey + 1);
    loadUsers();
    toast.success("Atualizado com sucesso!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: false,
      theme: "dark",
    });
  }
  return (
    <div className="px-8 py-2">
      {loading && <LoadingFull size={35} />}
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h1 className=" text-themecolor-200 text-2xl">Usuários</h1>
          {(newUserCount !== 0 || newClientCount !== 0) && (
            <p className="text-sm text-themecolor-400 ml-1">
              Olá, temos{" "}
              {newUserCount !== 0 && (
                <span>
                  <span className=" text-secondColor-400">{newUserCount}</span>{" "}
                  {newUserCount > 1 ? "novos" : "novo"} Usuários
                </span>
              )}{" "}
              {newClientCount !== 0 && (
                <span>
                  {" "}
                  e{" "}
                  <span className=" text-secondColor-400">
                    {newClientCount}
                  </span>{" "}
                  {newClientCount > 1 ? "novos" : "novo"} clientes
                </span>
              )}{" "}
              desde a última visita!
            </p>
          )}
        </div>
        <BsArrowCounterclockwise
          key={key}
          className={`text-2xl cursor-pointer text-secondColor-300 transform transition-transform duration-500 ease-in-out ${
            spin ? "rotate-[360deg]" : "hover:-rotate-90"
          }`}
          onMouseEnter={() => setSpin(false)}
          onMouseLeave={() => setSpin(false)}
          onClick={resetData}
        />
      </div>
      <div className="flex justify-between ">
        <div className="rounded-md p-3 bg-themecolor-900 w-[48%] text-themecolor-400">
          <div className="w-full flex justify-between">
            <span className="text-sm">Total de Usuários</span>
          </div>
          <span className=" text-themecolor-50 text-4xl">
            {users && users.length}
          </span>
        </div>
        <div className="rounded-md p-3 bg-themecolor-900 w-[48%] text-themecolor-400">
          <div className="">
            <span className="text-sm">Total de clientes</span>
          </div>
          <div>
            {" "}
            <span className=" text-themecolor-50 text-4xl">
              {customerLength}
            </span>
          </div>
        </div>{" "}
      </div>
      <div className="rounded-md p-3 mt-6 bg-themecolor-900 text-themecolor-400">
        {/* card */}
        <div>
          <h2 className="lg:text-xl xl:text-2xl text-themecolor-100">
            Lista de Usuários
          </h2>
        </div>
        <div className="w-full">
          <div className="w-full flex justify-between lg:text-xs xl:text-sm mb-4 mt-4">
            <div className="w-[20%] ">
              <span>Usuário</span>
            </div>
            <div className=" w-[13%]">
              <span>Telefone</span>
            </div>
            <div className=" w-[20%]">
              <span>E-mail</span>
            </div>
            <div className=" w-[16%]">
              <span>Clientes cadastrados</span>
            </div>
            <div className=" w-[15%]">
              <span>Perfil do escritorio</span>
            </div>
          </div>
          {users &&
            users.map((user, index) => (
              <div
                key={index}
                className="py-2 xl:text-base lg:text-[0.813rem] w-full flex justify-between items-center text-themecolor-50 border-b border-b-themecolor-800"
              >
                <div className="w-[20%] flex items-center">
                  <div className="mr-1.5">
                    {user.Office.length > 0 && user.Office[0].image !== null ? (
                      <img
                        className=" rounded-[50%] lg:w-9 lg:h-9 xl:w-10 xl:h-10"
                        src={user.Office[0].image}
                        alt="LogoCompany"
                      />
                    ) : (
                      <FaUserCircle className="lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-themecolor-300" />
                    )}
                  </div>
                  <span>{user.name}</span>
                </div>
                <div className=" w-[13%]">
                  <span>{formatPhone(user.phone)}</span>
                </div>
                <div className=" w-[20%] truncate">
                  <span>{user.email}</span>
                </div>
                <div className=" w-[16%]">
                  <div className=" ">{user.Customer.length}</div>
                </div>
                <div className=" w-[15%]">
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
                    <div className="bg-[#388E3C] text-[#fff] rounded px-4 py-0.5 inline-block">
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
                    <div className="bg-[#FFA000] text-[#fff] rounded px-4 py-0.5 inline-block">
                      Incompleto
                    </div>
                  ) : (
                    <div className="bg-[#B00020] text-[#fff] rounded px-4 py-0.5 inline-block">
                      Não cadastrado
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        {/* STATUS PARA VER SE ELE CADASTROU ESCRITORIO COM INCOMPLETO COMPLETO E NÃO*/}
      </div>{" "}
    </div>
  );
}

export default Users;
