import { sideBarContext } from "../context/sideBarContext/sideBarContext";
import { useContext } from "react";

function useSideBarContext() {
  const context = useContext(sideBarContext);
  if (context === undefined) {
    throw new Error("Não está dentro do contexto");
  }
  return context;
}

export default useSideBarContext;
