import useSWR from "swr";
import Producto from "../components/Producto";
import useQuiosco from "../hooks/useQuiosco";
import clienteAxios from "../config/axios";

const Inicio = () => {
  const { categoriaActual } = useQuiosco();
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios
      .get("/productos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(`/productos`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <p>Cargando...</p>;

  const productos = data.data.filter(
    (producto) => producto.categoria_id === categoriaActual.id
  );

  return (
    <>
      <h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación.
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => (
          <Producto
            key={producto.imagen}
            producto={producto}
            botonAgregar={true}
          />
        ))}
      </div>
    </>
  );
};
export default Inicio;
