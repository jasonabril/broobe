import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../components/login";

const useLogin = (user, action) => {
  const loginUrl = "https://challenge.broobe.net/api/v1/login";
  const [jwt, setJwt] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState();
  const [session, setSession] = useState(false);

  const confirmLoginData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(loginUrl, params, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      const json = await response.data;
      localStorage.setItem("token", json.token.toString());
      setJwt(json.token);
      setSession(true);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    setParams({
      email: user.name,
      password: user.pass,
    });
    if (action) {
      confirmLoginData();
    }
  }, [action]);

  return { jwt, loading, error, session };
};

export default useLogin;
