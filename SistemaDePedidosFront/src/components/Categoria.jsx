import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({ categoria }) => {
  const { handleClickCategoria } = useQuiosco();
  const { nombre, icono, id } = categoria;

  return (
    <div
      className="flex items-center justify-center gap-4 w-full py-4 rounded-lg font-bold text-lg text-slate-700 bg-[#e9e5e2] hover:bg-[#bf4438] hover:text-white transition cursor-pointer"
      onClick={() => handleClickCategoria(id)}
    >
      {/* <img
        alt={`Icono de ${nombre}`}
        src={`/img/icono_${icono}.svg`}
        className="w-10"
      /> */}
      <span className="truncate">{nombre}</span>
    </div>
  );
};

export default Categoria;
