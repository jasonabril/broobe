import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../components/login";
import { useNavigate } from "react-router-dom";
import Loading from "../assets/loading.gif";
import Swal from "sweetalert2";

const useIssues = () => {
  const ISSUES = "https://challenge.broobe.net/api/v1/issues";
  const GETPRIORITIES = "https://challenge.broobe.net/api/v1/priorities";
  const { logged, token, priority, data, priorityState } =
    useContext(LoginContext);
  const [priorities, setPriorities] = useState([]);
  const [isEmpty, setIsEmpty] = useState();
  const [issues, setIssues] = useState([]);
  const [form, setForm] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getIssues = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(ISSUES, {
        headers: { Authorization: "Bearer " + token },
      });
      const json = await response.data;
      setIssues(json);
      setTimeout(() => {
        setIsEmpty(false);
        setIsLoading(false);
      }, 3000);
      if (data && data.length === 0) {
        setIsEmpty(true);
      }
    } catch (err) {
      setIsLoading(false);
      console.log({ err });
    }
  };
  useEffect(() => {
    logged && getIssues();
  }, [logged]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const getIssueToUpdate = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(ISSUES + `?id=${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      const json = await response.data;
      json.map((el) => {
        return id === el.id && setForm(el);
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };

  const updateIssue = async (e, body) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.patch(`${ISSUES}/${body.id}`, body, {
        headers: { Authorization: "Bearer " + token },
      });

      navigate("/");
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.log({ error });
    }
  };

  const getPriorities = async () => {
    try {
      const response = await axios.get(GETPRIORITIES, {
        headers: { Authorization: "Bearer " + token },
      });
      const json = await response.data;
      setPriorities(json);
      priorityState(json);
      if (priorities.length < 1) {
        setIsEmpty(true);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const postIssue = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(ISSUES, form, {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIssue = async (id) => {
    Swal.fire({
      title: "Do you want to delete the Issue?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        axios
          .delete(`${ISSUES}/${id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setIsLoading(true);
            navigate("/");
            setTimeout(() => {
              setIsLoading(false);
            }, 1500);
          })
          .catch((err) => {
            console.log({ err });
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    getPriorities();
    setTimeout(() => {
      getIssueToUpdate(data);
      setPriorities(priority);
    }, 1000);
  }, [data]);
  return {
    issues,
    isEmpty,
    isLoading,
    handleInputChange,
    form,
    getIssues,
    getIssueToUpdate,
    updateIssue,
    priority,
    postIssue,
    deleteIssue,
    Loading,
    navigate,
  };
};

export default useIssues;
