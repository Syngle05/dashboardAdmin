import React from "react";
import CardOrderMobile from "./CardOrderMobile";
import OrderMobileProvider from "../../../context/orderMobileContext/OrderMobileProvider";

function OrdersMobile({ orders, isPaid }) {
  return (
    <>
      <div>
        <h2 className="text-lg text-themecolor-100">Lista de Pedidos</h2>
      </div>
      <div className="w-full flex justify-between text-[0.625rem]  mb-4 mt-4 ">
        <div className="mx-2  w-[calc(24%-0.5rem)] truncate ">
          <span>Data</span>
        </div>
        <div className="mx-2 w-[calc(31%-0.5rem)] truncate">
          <span>Serviço/produto</span>
        </div>

        <div className="truncate mx-2 w-[calc(18%-0.5rem)]">
          <span>Valor</span>
        </div>

        <div className="truncate mx-2 w-[calc(20%-0.5rem)]">
          <span>Status</span>
        </div>

        <div className="mx-2 w-[calc(8%-0.5rem)]"></div>
      </div>
      <div className="w-full text-[0.688rem] ">
        <OrderMobileProvider>
          {orders?.length > 0 ? (
            orders.map((order) => (
              <CardOrderMobile
                key={order.id}
                order={order}
                isPaid={isPaid.find(
                  (orderFireBase) => orderFireBase.IdOrder === order.id
                )}
              />
            ))
          ) : (
            <p>Não possui pedidos</p>
          )}
        </OrderMobileProvider>
      </div>
    </>
  );
}

export default OrdersMobile;
