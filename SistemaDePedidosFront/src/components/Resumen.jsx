import ResumenProducto from "./ResumenProducto";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
import useAuth from "../hooks/useAuth";

const Resumen = () => {
  const { pedido, total, handleSubmitNuevaOrden } = useQuiosco();
  const { logout } = useAuth({});

  const comprobarPedido = () => pedido.length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitNuevaOrden(logout);
  };

  return (
    <aside className="md:w-102 h-screen bg-gray-50 border-l p-5 flex flex-col">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-800">Mi Pedido</h1>
        <p className="text-sm text-gray-600 mt-2">
          Revisa los productos antes de confirmar
        </p>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto mt-6">
        {pedido.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No hay productos en tu pedido
          </p>
        ) : (
          pedido.map((producto) => (
            <ResumenProducto key={producto.id} producto={producto} />
          ))
        )}
      </div>

      {/* Total */}
      <div className="border-t pt-4 mt-4">
        <p className="text-lg text-gray-700 flex justify-between">
          <span>Total:</span>
          <span className="font-black text-gray-900">
            {formatearDinero(total)}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="submit"
            value="Confirmar Pedido"
            disabled={comprobarPedido()}
            className={`w-full py-3 rounded-lg font-bold uppercase text-white transition-all
              ${
                comprobarPedido()
                  ? "bg-[#e9e5e2] cursor-not-allowed"
                  : "bg-[#bf4438] shadow-lg hover:bg-[#8c2a1a] hover:shadow-none cursor-pointer"
              }`}
          />
        </form>
      </div>
    </aside>
  );
};

export default Resumen;
