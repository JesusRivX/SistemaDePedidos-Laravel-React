import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

const ModalProducto = () => {
  const { producto, handleClickModal, handleAgregarPedido, pedido } =
    useQuiosco();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  useEffect(() => {
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const productoEdition = pedido.filter(
        (pedidoState) => pedidoState.id === producto.id
      )[0];
      setCantidad(productoEdition.cantidad);
      setEdicion(true);
    }
  }, [pedido]);

  return (
    <div className="md:flex gap-8">
      <div className="md:w-1/3">
        <img
          alt={`Imagen producto ${producto.nombre}`}
          src={`/img/${producto.imagen}.jpg`}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </div>

      <div className="md:w-2/3 flex flex-col">
        <div className="flex justify-end">
          <button
            onClick={handleClickModal}
            className="text-gray-400 hover:text-[#bf4438] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl font-black mt-4 text-gray-800">
          {producto.nombre}
        </h1>

        <p className="mt-3 font-black text-4xl text-[#bf4438]">
          {formatearDinero(producto.precio)}
        </p>

        <div className="flex items-center gap-5 mt-6">
          <button
            type="button"
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9" />
            </svg>
          </button>

          <span className="text-2xl font-bold">{cantidad}</span>

          <button
            type="button"
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => cantidad < 5 && setCantidad(cantidad + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="mt-8 bg-[#bf4438] hover:bg-[#a63a30] transition-colors px-6 py-3 text-white font-black uppercase rounded-lg shadow-md"
          onClick={() => {
            handleAgregarPedido({ ...producto, cantidad });
            handleClickModal();
          }}
        >
          {edicion ? "Guardar Cambios" : "Añadir al Pedido"}
        </button>
      </div>
    </div>
  );
};
export default ModalProducto;
