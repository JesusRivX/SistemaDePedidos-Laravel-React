import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  return (
    <main className="min-h-dvh max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center">
      <img
        className="max-w-xs rounded-lg mb-6 md:mb-0 md:mr-10"
        src="/img/logoProyecto.png"
        alt="Imagen Logotipo"
      />

      <div className="w-full">
        <Outlet />
      </div>

      <ToastContainer />
    </main>
  );
};

export default AuthLayout;
