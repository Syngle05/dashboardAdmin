import { useState } from "react";
import { orderMobileContext } from "./orderMobileContext";
function OrderMobileProvider({ children }) {
  const [idOrder, setIdOrder] = useState("");

  return (
    <orderMobileContext.Provider
      value={{
        idOrder,
        setIdOrder,
      }}
    >
      {children}
    </orderMobileContext.Provider>
  );
}

export default OrderMobileProvider;
