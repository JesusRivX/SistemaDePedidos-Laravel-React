// import Producto from "../components/Producto";
import { useState, useMemo } from "react";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Productos = () => {
  const { handleClickProductoAgotado } = useQuiosco();
  const [pagina, setPagina] = useState(1);
  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios("/productos", {
      params: {
        all: true,
        page: pagina,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data);

  const { data, isLoading } = useSWR(["/productos", pagina], fetcher, {
    refreshInterval: 5000,
    keepPreviousData: true,
  });

  if (isLoading) return "Cargando...";

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-800 tracking-tight">
            Productos
          </h1>
          <p className="text-lg text-gray-500 mt-1">
            Gestiona la disponibilidad de los productos
          </p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-100">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4 text-left">Imagen</th>
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Precio</th>
              <th className="p-4 text-center">Estado</th>
              <th className="p-4 text-center">Acción</th>
            </tr>
          </thead>

          <tbody>
            {data?.data?.map(({ id, imagen, nombre, precio, disponible }) => (
              <tr key={id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4">
                  <img
                    src={`/img/${imagen}.jpg`}
                    alt={nombre}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                </td>

                <td className="p-4 font-semibold text-gray-800">{nombre}</td>

                <td className="p-4 text-gray-700 font-medium">
                  {formatearDinero(precio)}
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      disponible
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {disponible ? "Disponible" : "Agotado"}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => handleClickProductoAgotado(id)}
                    className="px-4 py-2 rounded-lg font-bold text-white shadow-sm transition hover:opacity-90"
                    style={{ backgroundColor: "#bf4438" }}
                  >
                    Cambiar estado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => setPagina(1)}
          disabled={data?.meta?.current_page === 1}
          className={`px-3 py-2 rounded font-bold ${
            data?.meta?.current_page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          ««
        </button>

        <button
          onClick={() => setPagina((prev) => prev - 1)}
          disabled={!data?.links?.prev}
          className={`px-4 py-2 rounded font-bold ${
            data?.links?.prev
              ? "bg-gray-200 hover:bg-gray-300"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          ← Anterior
        </button>

        {data?.meta &&
          (() => {
            const current = data.meta.current_page;
            const last = data.meta.last_page;
            const pages = [];

            let start = Math.max(1, current - 2);
            let end = Math.min(last, current + 2);

            if (current <= 3) end = Math.min(5, last);
            if (current >= last - 2) start = Math.max(last - 4, 1);

            for (let i = start; i <= end; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => setPagina(i)}
                  className={`px-4 py-2 rounded font-bold transition ${
                    pagina === i
                      ? "text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  style={pagina === i ? { backgroundColor: "#bf4438" } : {}}
                >
                  {i}
                </button>
              );
            }

            return pages;
          })()}

        <button
          onClick={() => setPagina((prev) => prev + 1)}
          disabled={!data?.links?.next}
          className={`px-4 py-2 rounded font-bold ${
            data?.links?.next
              ? "bg-gray-200 hover:bg-gray-300"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Siguiente →
        </button>

        <button
          onClick={() => setPagina(data?.meta?.last_page)}
          disabled={data?.meta?.current_page === data?.meta?.last_page}
          className={`px-3 py-2 rounded font-bold ${
            data?.meta?.current_page === data?.meta?.last_page
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          »»
        </button>
      </div>

      {data?.meta && (
        <p className="text-center text-sm text-gray-500">
          Mostrando <span className="font-semibold">{data.meta.from}</span> –
          <span className="font-semibold"> {data.meta.to}</span> de
          <span className="font-semibold"> {data.meta.total}</span> productos ·
          Página {data.meta.current_page} de {data.meta.last_page}
        </p>
      )}
    </div>
  );
};

export default Productos;
