import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const ResumenProducto = ({ producto }) => {
  const { handleEditarCantidad, handleEliminarProductoPedido } = useQuiosco();
  const { nombre, cantidad, precio, id, imagen } = producto;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-4 mb-4">
      <div className="flex gap-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <img
            src={`/img/${imagen}.jpg`}
            alt={`Imagen de ${nombre}`}
            className="w-full h-full object-cover rounded-xl"
          />

          <span className="absolute -top-2 -right-2 bg-[#bf4438] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
            x{cantidad}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <p className="text-lg font-bold text-gray-800 leading-tight">
              {nombre}
            </p>
            <p className="text-sm font-bold text-[#bf4438]">
              {formatearDinero(precio * cantidad)}
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Unitario{" "}
            <span className="font-semibold text-gray-700">
              {formatearDinero(precio)}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          title="Editar cantidad"
          onClick={() => handleEditarCantidad(id)}
          className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>

        <button
          type="button"
          title="Eliminar producto"
          onClick={() => handleEliminarProductoPedido(id)}
          className="p-2 rounded-lg bg-[#bf4438] text-white hover:bg-[#a63a30] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ResumenProducto;
