import { userMobileContext } from "../context/userMobileContext/userMobileContext";
import { useContext } from "react";

function useUserMobileContext() {
  const context = useContext(userMobileContext);
  if (context === undefined) {
    throw new Error("Não está dentro do contexto");
  }
  return context;
}

export default useUserMobileContext;
