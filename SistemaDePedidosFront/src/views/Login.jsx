import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createRef } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const emailRef = createRef();
  const passwordRef = createRef();
  const [errores, setErrores] = useState([]);
  const { login } = useAuth({
    middleware: "guest",
    url: "/",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    login(datos, setErrores);
  };

  return (
    <>
      <h1 className="text-4xl font-black">Iniciar Sesión</h1>

      <div className="bg-white shadow rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {/* {errores
            ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)
            : null} */}
          <div className="mb-4">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              className="mt-2 w-full p-3 bg-gray-50"
              name="email"
              placeholder="Tu Email"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password"
              placeholder="Tu Password"
              ref={passwordRef}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-[#bf4438] w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-[#8c2a1a] transition-colors"
          />
        </form>
      </div>

      <nav className="mt-5">
        <Link
          to="/auth/register"
          className="text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta?{" "}
          <span className="text-[#bf4438] font-bold">Regístrate</span>
        </Link>
      </nav>
    </>
  );
  scrollY;
};
export default Login;
