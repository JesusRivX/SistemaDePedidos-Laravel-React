import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layouts/Layout.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import AdminLayout from "./Layouts/AdminLayout.jsx";
import Inicio from "./views/Inicio.jsx";
import Login from "./views/Login.jsx";
import Registro from "./views/Registro.jsx";
import Ordenes from "./views/Ordenes.jsx";
import Productos from "./views/Productos.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registro />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Ordenes />,
      },
      {
        path: "productos",
        element: <Productos />,
      },
    ],
  },
]);

export default router;
