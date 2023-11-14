import React, { useEffect, useState } from "react";
import LoadingFull from "../components/LoadingFull";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { toast } from "react-toastify";
import { getAllOrders } from "../services/orders";
import CardOrderAdmin from "../components/orders/CardOrderAdmin";
import TooltipComponent from "../components/TooltipComponent";
import { useMediaQuery } from "react-responsive";
import OrdersMobile from "../components/Mobile/Orders/OrdersMobile";

function Orders() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [spin, setSpin] = useState(false);
  const [key, setKey] = useState(0);

  const mobile = useMediaQuery({ query: "(max-width: 640px)" });
  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const data = await getAllOrders();
    if (data.length > 0) {
      data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    setOrders(data);
    setLoading(false);
  }

  function resetData() {
    setSpin(true);
    setKey((prevKey) => prevKey + 1);
    loadOrders();
    toast.success("Atualizado com sucesso!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: false,
      theme: "dark",
    });
  }
  return (
    <div className="px-3.5 sm:px-8 py-2">
      <TooltipComponent id="tooltip-data" />
      <TooltipComponent id="tooltip-contador" />
      <TooltipComponent id="tooltip-empresa-cliente" />
      <TooltipComponent id="tooltip-serviço" />
      <TooltipComponent id="tooltip-fornecedor" />
      <TooltipComponent id="tooltip-valor" />
      <TooltipComponent id="tooltip-previsibilidade" />
      <TooltipComponent id="tooltip-status" />
      <TooltipComponent id="tooltip-pagamento" />
      {loading && <LoadingFull size={35} />}
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h1 className=" text-themecolor-200 text-2xl">Pedidos</h1>
          {/* {(newUserCount !== 0 || newClientCount !== 0) && (
            <p className="text-xs lg:text-sm lg:ml-1 text-themecolor-400 ">
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
          )} */}
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
          <div>
            <span className="text-xs lg:text-xs xl:text-sm">Total</span>
          </div>
          <span className=" text-2xl text-themecolor-50 lg:text-3xl xl:text-4xl">
            {orders && orders.length}
          </span>
          <span className="text-xs lg:text-xs xl:text-sm  ml-2">Pedidos</span>
        </div>
        <div className="rounded-md p-3 bg-themecolor-900 w-[48%] text-themecolor-400">
          <div className="">
            <span className="text-xs lg:text-xs xl:text-sm">
              ICP certificadora
            </span>
          </div>
          <div>
            {" "}
            <span className=" text-2xl text-themecolor-50 lg:text-3xl xl:text-4xl">
              {orders && orders.length}
            </span>
            <span className="text-xs lg:text-xs xl:text-sm  ml-2">Pedidos</span>
          </div>
        </div>{" "}
      </div>
      <div className="rounded-md p-3 mt-6 bg-themecolor-900 text-themecolor-400">
        {mobile && <OrdersMobile orders={orders} />}
        {!mobile && (
          <>
            <div>
              <h2 className="lg:text-[1.188rem] xl:text-2xl text-themecolor-100">
                Lista de Pedidos
              </h2>
            </div>
            <div className="w-full flex justify-between lg:text-[0.500rem] xl:text-xs mb-4 mt-4 ">
              <div className="mx-2  w-[calc(10%-0.5rem)] truncate ">
                <span
                  data-tooltip-id="tooltip-data"
                  data-tooltip-content="Data"
                  data-tooltip-place="bottom"
                >
                  Data
                </span>
              </div>

              <div className="mx-2 w-[calc(14.5%-0.5rem)] truncate ">
                <span
                  data-tooltip-id="tooltip-contador"
                  data-tooltip-content="Contador"
                  data-tooltip-place="bottom"
                >
                  Contador
                </span>
              </div>
              <div className=" mx-2 w-[calc(14.5%-0.5rem)] truncate">
                <span
                  data-tooltip-id="tooltip-empresa-cliente"
                  data-tooltip-content="Empresa Cliente"
                  data-tooltip-place="bottom"
                >
                  Empresa Cliente
                </span>
              </div>
              <div className="mx-2 w-[calc(11.5%-0.5rem)] truncate">
                <span
                  data-tooltip-id="tooltip-serviço"
                  data-tooltip-content="Serviço/produto"
                  data-tooltip-place="bottom"
                >
                  Serviço/produto
                </span>
              </div>
              <div className=" mx-2 w-[calc(12.5%-0.5rem)] truncate">
                <span
                  data-tooltip-id="tooltip-fornecedor"
                  data-tooltip-content="Fornecedor"
                  data-tooltip-place="bottom"
                >
                  Fornecedor
                </span>
              </div>
              <div className="truncate mx-2 w-[calc(7%-0.5rem)]">
                <span
                  data-tooltip-id="tooltip-valor"
                  data-tooltip-content="Valor"
                  data-tooltip-place="bottom"
                >
                  Valor
                </span>
              </div>
              <div className="mx-2 w-[calc(13%-0.5rem)] truncate">
                <span
                  data-tooltip-id="tooltip-previsibilidade"
                  data-tooltip-content="Previsibilidade"
                  data-tooltip-place="bottom"
                >
                  Previsibilidade
                </span>
              </div>
              <div className="truncate mx-2 w-[calc(9%-0.5rem)]">
                <span
                  data-tooltip-id="tooltip-status"
                  data-tooltip-content="Status"
                  data-tooltip-place="bottom"
                >
                  Status
                </span>
              </div>
              <div className="truncate mx-2 w-[calc(8%-0.5rem)]">
                <span
                  data-tooltip-id="tooltip-pagamento"
                  data-tooltip-content="Pagamento"
                  data-tooltip-place="bottom"
                >
                  Pagamento
                </span>
              </div>
            </div>
            <div className="w-full xl:text-sm lg:text-[0.625rem] ">
              {orders?.length > 0 ? (
                orders.map((order) => (
                  <CardOrderAdmin key={order.id} order={order} />
                ))
              ) : (
                <p>Não possui pedidos</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Orders;
