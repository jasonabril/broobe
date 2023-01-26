import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { LoginContext } from "../login";

const UpdateIssue = () => {
  const UPDATEISSUE = "https://challenge.broobe.net/api/v1/issues";
  const [form, setForm] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const [priorities, setPriorities] = useState([]);
  const { priority, token, data } = useContext(LoginContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const getIssueToUpdate = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(UPDATEISSUE + `?id=${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      const json = await response.data;
      // console.log(" en update", json);
      json.map((el) => {
        // console.log({ el });
        return id === el.id && setForm(el);
      });

      console.log({ form });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getIssueToUpdate(data);
      setPriorities(priority);
    }, 1000);
  }, [data]);

  const updateIssue = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(UPDATEISSUE, {
        headers: { Authorization: "Bearer " + token },
      });
      const json = await response.data;
      console.log(" en update", json);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="d-flex justify-content-center mh-100">
      {form && form.id === data && (
        <form name="login" method="post">
          <h1 className="mt-5 mb-3">Update Issue</h1>

          <div className="form-floating mb-3">
            <input
              name="name"
              type="text"
              className="form-control"
              id="floatingInput3"
              defaultValue={form.name}
              onChange={handleInputChange}
              disabled
            />
            <label htmlFor="floatingInput3">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="description"
              type="text"
              className="form-control"
              id="floatingInput4"
              defaultValue={form.description}
              onChange={handleInputChange}
              disabled
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
              {!isEmpty &&
                priorities &&
                priorities.map((el) => {
                  return (
                    form.priority_id === el.id && (
                      <option key={el.id} value={el.id}>
                        {el.type}
                      </option>
                    )
                  );
                })}
            </select>
            <label>Priorities</label>
          </div>

          <div className="container my-3">
            <button
              // disabled={waiting}
              className="row w-100 btn btn-success my-1"
              onClick={updateIssue}
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateIssue;
