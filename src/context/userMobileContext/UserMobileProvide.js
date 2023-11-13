import { useState } from "react";
import { userMobileContext } from "./userMobileContext";
function UserMobileProvider({ children }) {
  const [idUser, setIdUser] = useState("");

  return (
    <userMobileContext.Provider
      value={{
        idUser,
        setIdUser,
      }}
    >
      {children}
    </userMobileContext.Provider>
  );
}

export default UserMobileProvider;
