import React, { useContext } from "react";
import useIssues from "../../hooks/useIssues";
import { LoginContext } from "../login";

const Logout = () => {
  const { isLoading } = useIssues();
  const { logout } = useContext(LoginContext);
  return (
    <>
      {!isLoading ? (
        <button className="btn btn-warning mb-5" onClick={() => logout()}>
          Logout
        </button>
      ) : null}
    </>
  );
};

export default Logout;
