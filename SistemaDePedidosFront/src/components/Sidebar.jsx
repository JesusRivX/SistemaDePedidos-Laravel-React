import Categoria from "./Categoria";
import useQuiosco from "../hooks/useQuiosco";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { logout, user } = useAuth({ middleware: "auth" });
  const { categorias } = useQuiosco();

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img className="w-40" src="img/logo.svg" alt="Imagen Logo" />
      </div>

      <p className="text-center my-5 font-bold text-2xl">Hola, {user?.name}</p>

      <div className="mt-10">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </div>

      <div className="my-5 px-5">
        <button
          type="button"
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate cursor-pointer hover:bg-red-600 transition-colors"
          onClick={logout}
        >
          Cancelar Orden
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
