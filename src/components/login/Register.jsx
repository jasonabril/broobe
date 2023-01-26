import axios from "axios";
import { useState } from "react";

const Register = (props) => {
  const REGISTER = "https://challenge.broobe.net/api/v1/users";
  const [form, setForm] = useState({});
  const [duplicate, setDuplicate] = useState(false);
  const [messageErr, setMessageErr] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const checkForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(REGISTER, form);
      // const json = await response.data;
      // console.log({ json });
      props.signup(false);
    } catch (err) {
      if (err.response.data.message.includes("Duplicate")) {
        setDuplicate(true);
        setMessageErr("ya existe el usuario");
        setTimeout(() => {
          setDuplicate(false);
        }, 5000);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center mh-100">
      <form name="login">
        <h1 className="mt-5 mb-3">Registro</h1>
        {duplicate && (
          <div className="alert alert-warning" role="alert">
            {messageErr}
          </div>
        )}
        {props.error && (
          <div className="alert alert-danger" role="alert">
            {props.error.message}
          </div>
        )}
        <div className="form-floating mb-3">
          <input
            name="name"
            type="text"
            className="form-control"
            id="floatingInput1"
            onChange={handleInputChange}
          />
          <label htmlFor="floatingInput1">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            name="email"
            type="email"
            className="form-control"
            id="floatingInput"
            onChange={handleInputChange}
          />
          <label htmlFor="floatingInput">E-mail</label>
        </div>

        <div className="form-floating">
          <input
            name="password"
            type="password"
            className="form-control"
            id="floatingPassword"
            onChange={handleInputChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="container my-3">
          <button
            // disabled={waiting}
            className="row w-100 btn btn-primary my-1 btn-dark"
            onClick={checkForm}
          >
            Registrarse
          </button>
        </div>

        <button
          className="btn link-secondary btn-dark mt-3 mb-5 text-info"
          onClick={() => props.signup(false)}
        >
          Loguearse
        </button>
      </form>
    </div>
  );
};
export default Register;
