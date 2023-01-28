import useIssues from "../../hooks/useIssues";

const CreateIssue = () => {
  const { priority, handleInputChange, postIssue, isLoading, Loading } =
    useIssues();

  return (
    <div className="d-flex justify-content-center mh-100">
      {isLoading ? (
        <img src={Loading} />
      ) : (
        priority &&
        !isLoading && (
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
                <option selected disabled>
                  Select one
                </option>
                {priority &&
                  priority.map((el) => {
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
                className="row w-100 btn btn-primary my-1"
                onClick={postIssue}
              >
                Create
              </button>
            </div>
          </form>
        )
      )}
    </div>
  );
};

export default CreateIssue;
