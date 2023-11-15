import { AuthContext } from "../context/AuthProvider/AuthContext";
import { useContext } from "react";

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Não está dentro do contexto");
  }
  return context;
}

export default useAuthContext;
