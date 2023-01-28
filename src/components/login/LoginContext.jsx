import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [logged, setLogged] = useState(null);
  const [token, setToken] = useState("");
  const [data, setData] = useState();
  const [priority, setPriority] = useState();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
    setLogged(false);
  };

  const login = (jwt) => {
    setToken(jwt);

    setLogged(true);
  };

  const id = (obj) => {
    setData(obj);
  };

  const priorityState = (set) => {
    setPriority(set);
  };

  return (
    <LoginContext.Provider
      value={{
        logout,
        login,
        logged,
        token,
        id,
        data,
        priority,
        priorityState,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
export default LoginContext;
