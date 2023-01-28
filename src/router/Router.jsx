import { Routes, Route, Link } from "react-router-dom";
import { LoginLayout } from "../components/layout";
import { Login } from "../components/login";

import { IssuesPage, CreateIssuesPage, LoginPage, UpdatePage } from "../pages";

export const Router = () => {
  return (
    <LoginLayout>
      <Routes>
        <Route path="/" element={<IssuesPage />} />
        <Route path="/createissue" element={<CreateIssuesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/update" element={<UpdatePage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </LoginLayout>
  );
};
