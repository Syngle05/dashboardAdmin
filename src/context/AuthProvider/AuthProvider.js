import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { getToken } from "../../services/FireBase";

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getToken();

      const storedToken = localStorage.getItem("token");

      if (
        !(storedToken === data[0].tokenDefault) &&
        !["/signin"].includes(location.pathname)
      ) {
        navigate("/signin");
      }
      setToken(storedToken);
    };
    fetchData();
  }, [localStorage.getItem("token")]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  //   const logout = () => {
  //     localStorage.removeItem("token");
  //     setToken(null);
  //     navigate("/signin");
  //   };

  const isLoggedIn = () => {
    if (token !== null) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
