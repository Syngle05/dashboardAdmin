import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken && !["/signin"].includes(location.pathname)) {
      navigate("/signin");
    }
    setToken(storedToken);
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
