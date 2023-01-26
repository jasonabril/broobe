import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../login";
import axios from "axios";
/** body {
  "name": "Create React App.",
  "description": "Download the necessary tools for the application.",
  "priority_id": 1
} */
//https://challenge.broobe.net/api/v1/priorities PRIORIDADES. array get y post el create

const CreateIssue = () => {
  const { logged, token, priorityState } = useContext(LoginContext);
  const GETPRIORITIES = "https://challenge.broobe.net/api/v1/priorities";
  const CREATEISSUE = "https://challenge.broobe.net/api/v1/issues";
  const [priorities, setPriorities] = useState([]);
  const [form, setForm] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // console.log({ form });
  };

  const getPriorities = async () => {
    try {
      const response = await axios.get(GETPRIORITIES, {
        headers: { Authorization: "Bearer " + token },
      });
      const json = await response.data;
      setPriorities(json);
      priorityState(json);
      //   console.log({ priorities });
      if (priorities.length < 1) {
        setIsEmpty(true);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const postIssue = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(CREATEISSUE, form, {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      });
      const status = await res.status;
      console.log(status);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPriorities();
  }, []);

  return (
    <div className="d-flex justify-content-center mh-100">
      <form name="login" method="post">
        <h1 className="mt-5 mb-3">Create Issue</h1>

        <div className="form-floating mb-3">
          <input
            name="name"
            type="text"
            className="form-control"
            id="floatingInput3"
            onChange={handleInputChange}
          />
          <label htmlFor="floatingInput3">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            name="description"
            type="text"
            className="form-control"
            id="floatingInput4"
            onChange={handleInputChange}
          />
          <label htmlFor="floatingInput4">Description</label>
        </div>

        <div className="form-floating">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleInputChange}
            name="priority_id"
          >
            <option defaultValue disabled>
              Select one
            </option>
            {isEmpty &&
              priorities.map((el) => {
                return (
                  <option key={el.id} value={el.id}>
                    {el.type}
                  </option>
                );
              })}
          </select>
          <label>Priorities</label>
        </div>

        <div className="container my-3">
          <button
            // disabled={waiting}
            className="row w-100 btn btn-primary my-1"
            onClick={postIssue}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIssue;
