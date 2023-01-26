import { createContext, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState("");
  const [data, setData] = useState();
  const [priority, setPriority] = useState();

  function logout() {
    setLogged(false);
  }

  function login() {
    const jwt = sessionStorage.getItem("token");
    setToken(jwt.toString());
    setLogged(true);
  }

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
