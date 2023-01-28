import React from "react";
import CreateIssue from "../components/issues/CreateIssue";
import Logout from "../components/logout/Logout";

const CreateIssuesPage = () => {
  return (
    <>
      <div className="d-flex justify-content-end">
        <Logout />
      </div>
      <CreateIssue />
    </>
  );
};

export default CreateIssuesPage;
