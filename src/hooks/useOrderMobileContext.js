import { orderMobileContext } from "../context/orderMobileContext/orderMobileContext";
import { useContext } from "react";

function useOrderMobileContext() {
  const context = useContext(orderMobileContext);
  if (context === undefined) {
    throw new Error("Não está dentro do contexto");
  }
  return context;
}

export default useOrderMobileContext;
