import { useState, createRef } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const Registro = () => {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const [errores, setErrores] = useState([]);
  const { registro } = useAuth({ middleware: "guest", url: "/" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    registro(datos, setErrores);
  };

  return (
    <>
      <h1 className="text-4xl font-black">Crea tu cuenta</h1>

      <div className="bg-white shadow rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {/* {errores
            ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)
            : null} */}
          <div className="mb-4">
            <label htmlFor="name">Nombre: </label>
            <input
              type="text"
              id="name"
              className="mt-2 w-full p-3 bg-gray-50"
              name="name"
              placeholder="Tu Nombre"
              ref={nameRef}
            />
          </div>

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

          <div className="mb-4">
            <label htmlFor="password_confirmation">Repetir Password: </label>
            <input
              type="password"
              id="password_confirmation"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password_confirmation"
              placeholder="Repetir tu Password"
              ref={passwordConfirmationRef}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-[#bf4438] w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-[#8c2a1a] transition-colors"
          />
        </form>
      </div>

      <nav className="mt-5">
        <Link
          to="/auth/login"
          className="text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya tienes una cuenta?{" "}
          <span className="text-[#bf4438] font-bold">Inicia Sesión</span>
        </Link>
      </nav>
    </>
  );
};
export default Registro;
