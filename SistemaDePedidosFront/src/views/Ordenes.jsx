import useSWR from "swr";
import clienteAxios from "../config/axios";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Ordenes = () => {
  const { handleClickCompletarPedido } = useQuiosco();
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios("/pedidos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const { data, error, isLoading } = useSWR("/pedidos", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return "Cargando...";

  return (
    <div>
      <h1 className="text-4xl font-black">Órdenes</h1>
      <p className="text-2xl my-10">
        Administra las órdenes desde esta sección
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.data.data.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            <div
              className="px-5 py-3 rounded-t-xl text-white font-bold"
              style={{ backgroundColor: "#bf4438" }}
            >
              Pedido #{pedido.id}
            </div>

            <div className="p-5 flex-1 space-y-4">
              <p className="text-lg font-bold text-slate-600">
                Contenido del pedido
              </p>

              {pedido.productos.map((producto) => (
                <div
                  key={producto.id}
                  className="flex gap-4 border-b border-slate-200 last:border-none pb-4"
                >
                  <img
                    src={`/img/${producto.imagen}.jpg`}
                    alt={`Imagen de ${producto.nombre}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-slate-500">ID: {producto.id}</p>
                    <p className="font-semibold">{producto.nombre}</p>
                    <p className="text-sm">
                      Cantidad:{" "}
                      <span className="font-bold">
                        {producto.pivot.cantidad}
                      </span>
                    </p>
                  </div>
                </div>
              ))}

              <div className="pt-4 space-y-1">
                <p className="text-sm font-bold text-slate-600">
                  Cliente:
                  <span className="font-normal ml-1">{pedido.user.name}</span>
                </p>

                <p className="text-lg font-bold">
                  Total:
                  <span className="ml-2 font-normal text-slate-700">
                    {formatearDinero(pedido.total)}
                  </span>
                </p>
              </div>
            </div>

            <div className="p-5">
              <button
                type="button"
                className="w-full py-3 rounded-lg font-bold uppercase text-white transition"
                style={{ backgroundColor: "#bf4438" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#a63a30")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#bf4438")
                }
                onClick={() => handleClickCompletarPedido(pedido.id)}
              >
                Completar Pedido
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Ordenes;
