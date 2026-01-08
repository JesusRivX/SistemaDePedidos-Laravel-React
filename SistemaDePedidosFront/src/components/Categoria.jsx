import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({ categoria }) => {
  const { handleClickCategoria } = useQuiosco();
  const { nombre, icono, id } = categoria;
  return (
    <div className="flex items-center gap-4 border border-gray-200 w-full p-3 hover:bg-amber-400 cursor-pointer">
      <img
        alt={`Icono de ${nombre}`}
        src={`/img/icono_${icono}.svg`}
        className="w-12"
      />
      <button
        className="text-lg font-bold cursor-pointer truncate"
        type="button"
        onClick={() => handleClickCategoria(id)}
      >
        {nombre}
      </button>
    </div>
  );
};
export default Categoria;
