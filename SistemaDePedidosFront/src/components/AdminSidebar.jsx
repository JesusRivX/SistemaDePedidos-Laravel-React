import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminSidebar = () => {
  const { logout } = useAuth({ middleware: "auth" });
  return (
    <aside className="md:w-72 min-h-dvh flex flex-col bg-white">
      <div className="p-6">
        <img
          src="/img/logoProyecto.png"
          alt="imagen logotipo"
          className="w-40 mx-auto rounded-lg"
        />
      </div>

      <nav className="flex-1 flex flex-col justify-center gap-4 px-6">
        <Link
          to="/admin"
          className="block text-center py-4 rounded-lg font-bold text-lg text-slate-700 bg-[#e9e5e2] hover:bg-[#bf4438] hover:text-white transition"
        >
          Órdenes
        </Link>

        <Link
          to="/admin/productos"
          className="block text-center py-4 rounded-lg font-bold text-lg text-slate-700 bg-[#e9e5e2] hover:bg-[#bf4438] hover:text-white transition"
        >
          Productos
        </Link>
      </nav>

      <div className="p-5">
        <button
          type="button"
          className="w-full py-3 rounded-lg font-bold text-white transition"
          style={{ backgroundColor: "#bf4438" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#a63a30")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#bf4438")
          }
          onClick={logout}
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};
export default AdminSidebar;
