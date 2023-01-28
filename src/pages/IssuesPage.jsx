import React from "react";
import IssuesList from "../components/issues/IssuesList";
import Logout from "../components/logout/Logout";
const IssuesPage = () => {
  return (
    <>
      <div className="d-flex justify-content-end">
        <Logout />
      </div>
      <IssuesList />
    </>
  );
};

export default IssuesPage;
