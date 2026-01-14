import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Producto = ({
  producto,
  botonAgregar = false,
  botonDisponible = false,
}) => {
  const { handleClickModal, handleSetProducto, handleClickProductoAgotado } =
    useQuiosco();

  const { nombre, imagen, precio, id } = producto;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
      <div className="relative">
        <img
          src={`/img/${imagen}.jpg`}
          alt={`imagen ${nombre}`}
          className="w-full h-80 object-cover rounded-t-xl"
        />

        <span
          className="absolute top-3 right-3 text-white font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: "#000" }}
        >
          {formatearDinero(precio)}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <h3 className="text-xl font-bold">{nombre}</h3>

        {botonAgregar && (
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
            onClick={() => {
              handleClickModal();
              handleSetProducto(producto);
            }}
          >
            Agregar
          </button>
        )}

        {botonDisponible && (
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
            onClick={() => handleClickProductoAgotado(id)}
          >
            Producto Agotado
          </button>
        )}
      </div>
    </div>
  );
};

export default Producto;
