import Categoria from "./Categoria";
import useQuiosco from "../hooks/useQuiosco";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { logout, user } = useAuth({ middleware: "auth" });
  const { categorias } = useQuiosco();

  return (
    <aside className="md:w-72 min-h-dvh flex flex-col">
      <div className="p-5">
        <img
          className="w-40 mx-auto rounded-lg"
          src="/img/logoProyecto.png"
          alt="Imagen Logo"
        />
        <p className="text-center mt-6 font-bold text-2xl">
          Hola, {user?.name}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col justify-center gap-4 px-6">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </div>

      <div className="p-5">
        <button
          type="button"
          className="bg-red-500 w-full p-3 font-bold rounded-lg text-white truncate hover:bg-red-600 transition-colors"
          onClick={logout}
        >
          Cancelar Orden
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
