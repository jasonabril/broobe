import React from "react";
import UpdateIssue from "../components/issues/UpdateIssue";
import Logout from "../components/logout/Logout";
import useIssues from "../hooks/useIssues";

const UpdatePage = () => {
  const { isLoading, Loading } = useIssues();
  return (
    <>
      {isLoading ? (
        <img src={Loading} />
      ) : (
        <>
          <div className="d-flex justify-content-end">
            <Logout />
          </div>
          <UpdateIssue />
        </>
      )}
    </>
  );
};

export default UpdatePage;
