import { useContext } from "react";
import { Link } from "react-router-dom";
import useIssues from "../../hooks/useIssues";
import { LoginContext } from "../login";

const UpdateIssue = () => {
  const { form, handleInputChange, priority, updateIssue } = useIssues();
  const { data } = useContext(LoginContext);

  return (
    <div className="d-flex justify-content-center mh-100">
      {priority && form && form.id === data && (
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
              {priority.map((el) => {
                return form.priority_id === el.id ? (
                  <option selected key={el.id} value={form.priority_id}>
                    {el.type}
                  </option>
                ) : (
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
              className="row w-100 btn btn-success my-1"
              onClick={(e) => updateIssue(e, form)}
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
