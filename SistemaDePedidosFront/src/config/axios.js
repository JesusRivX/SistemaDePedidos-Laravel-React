import axios from "axios";

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Accept": "application/json", // sirve para indicar que esperamos una respuesta en formato JSON
    "Content-Type": "application/json", // sirve para indicar que el cuerpo de la solicitud está en formato JSON
    "X-Requested-With": "XMLHttpRequest", // sirve para indicar que la solicitud se realiza mediante AJAX
  },
  withCredentials: true,
});

export default clienteAxios;
