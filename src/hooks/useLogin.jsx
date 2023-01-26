import axios from "axios";
import React, { useEffect, useState } from "react";

const useLogin = (user, action) => {
  const loginUrl = "https://challenge.broobe.net/api/v1/login";
  const [jwt, setJwt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState();
  const [session, setSession] = useState(false);

  const confirmLoginData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(loginUrl, params);
      const json = await response.data;
      setSession(true);
      setJwt(json);
      setLoading(false);
      setError("");
    } catch (err) {
      setError(err.response.data);
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
