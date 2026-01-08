import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

const useAuth = ({ middleware, url }) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const navigate = useNavigate();
  const fetcher = () =>
    clienteAxios("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw Error(error?.response?.data?.errors);
      });

  const { data: user, error, mutate } = useSWR("/user", fetcher);

  const login = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post("/login", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      await mutate(); // Actualiza el estado del usuario después del login
      setErrores([]);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };

  const registro = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post("/registro", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      await mutate(); // Actualiza el estado del usuario después del registro
      setErrores([]);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };

  const logout = async () => {
    try {
      await clienteAxios.post("/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("AUTH_TOKEN");
      await mutate(undefined); // Actualiza el estado del usuario después del logout
    } catch (error) {
      throw Error(error?.response?.data?.errors);
    }
  };

  useEffect(() => {
    if (middleware === "guest" && url && user) {
      navigate(url);
    }
    if (middleware === "guest" && user && user.admin) {
      navigate("/admin");
    }
    if (middleware === "admin" && user && !user.admin) {
      navigate("/");
    }
    if (middleware === "auth" && error) {
      navigate("/auth/login");
    }
  }, [user, error]);

  console.log(user);
  console.log(error);
  console.log(middleware);
  console.log(url);

  return {
    login,
    registro,
    logout,
    user,
    error,
  };
};
export default useAuth;
