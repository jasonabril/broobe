import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../login";
import { Link } from "react-router-dom";

const IssuesList = () => {
  const GETISSUES = "https://challenge.broobe.net/api/v1/issues";
  const [data, setData] = useState([]);
  const [isEmpty, setIsEmpty] = useState();
  const { logged, token, id } = useContext(LoginContext);

  const getIssues = async () => {
    setIsEmpty(true);
    try {
      const response = await axios.get(GETISSUES, {
        headers: { Authorization: "Bearer " + token },
      });
      const json = await response.data;
      setData(json);
      setTimeout(() => {
        setIsEmpty(false);
      }, 1500);
      if (data && data.length === 0) {
        setIsEmpty(true);
      }
    } catch (err) {
      console.log({ err });
    }
  };
  useEffect(() => {
    logged && getIssues();
  }, []);

  return (
    <>
      <div className="container">
        {isEmpty && (
          <>
            <div className="alert alert-warning" role="alert">
              Issues List is empty
            </div>
          </>
        )}
        {!isEmpty && (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, index) => {
                return (
                  <tr key={el.id}>
                    <th scope="row">{el.id}</th>
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    <td>
                      <Link
                        to="/update"
                        onClick={() => id(el.id)}
                        className="btn btn-success mx-3 my-2"
                      >
                        Update
                      </Link>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Link
          to="/createissue"
          className="btn btn-primary"
          // onClick={<Link to="/createissue" />}
        >
          Create Issue
        </Link>
      </div>
    </>
  );
};

export default IssuesList;
