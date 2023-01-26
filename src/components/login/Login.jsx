import { useContext, useState, useEffect } from "react";
import useLogin from "../../hooks/useLogin";
import { LoginContext, Register } from "./";

const Login = () => {
  const { login } = useContext(LoginContext);
  const [form, setForm] = useState({ name: "", pass: "" });
  const [action, setAction] = useState(false);
  const [register, setRegister] = useState(false);
  const { jwt, loading, error, session } = useLogin(form, action);

  const checkForm = (e) => {
    e.preventDefault();
    setAction(true);
    setTimeout(() => {
      setAction(false);
    }, 1000);
  };
  useEffect(() => {
    if (error && error.message.length > 0) {
      setRegister(true);
    }
  }, [error]);

  useEffect(() => {
    if (jwt.token && jwt.token.length > 0) {
      localStorage.setItem("token", jwt.token.toString());
      login();
    }
  }, [jwt]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return register ? (
    <Register
      signup={setRegister}
      error={error}
      handleInputChange={handleInputChange}
    />
  ) : (
    <div className=" d-flex justify-content-center mh-100">
      <form name="login">
        <h2 className="my-5">Login</h2>
        <div className="form-floating mb-3">
          <input
            name="name"
            type="text"
            className="form-control"
            id="floatingInput"
            onChange={handleInputChange}
          />
          <label htmlFor="floatingInput">E-mail</label>
        </div>

        <div className="form-floating">
          <input
            name="pass"
            type="password"
            className="form-control"
            id="floatingPassword"
            onChange={handleInputChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="container my-5">
          <button
            className="row w-100 btn btn-primary btn-dark my-1"
            type="submmit"
            onClick={checkForm}
          >
            Login
          </button>
        </div>

        <button
          className="btn link-secondary mb-5 btn-dark text-info"
          onClick={() => setRegister(true)}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};
export default Login;

/*

*/
