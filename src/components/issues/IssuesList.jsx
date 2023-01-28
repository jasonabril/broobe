import { useContext } from "react";
import { Link } from "react-router-dom";
import useIssues from "../../hooks/useIssues";
import { LoginContext } from "../login";

const IssuesList = () => {
  const { issues, deleteIssue, priority, isLoading, Loading } = useIssues();
  const { id } = useContext(LoginContext);
  return (
    <>
      <div className="container">
        {!issues && !isLoading ? (
          <>
            <div className="alert alert-warning" role="alert">
              Issues List is empty
            </div>
          </>
        ) : (
          isLoading && <img src={Loading} />
        )}
        {issues && !isLoading && (
          <>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">State</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((el) => {
                  return (
                    <tr key={el.id}>
                      <th scope="row">{el.id}</th>
                      <td>{el.name}</td>
                      <td>{el.description}</td>
                      {priority &&
                        priority.map((element) => {
                          return (
                            element.id === el.priority_id && (
                              <td key={el.id}>{element.type}</td>
                            )
                          );
                        })}
                      <td>
                        <Link
                          to="/update"
                          onClick={() => id(el.id)}
                          className="btn btn-success mx-3 my-2"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => deleteIssue(el.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Link to="/createissue" className="btn btn-primary">
              Create Issue
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default IssuesList;
