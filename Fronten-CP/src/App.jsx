import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/Login";
import Registro from "./views/Registro";
import Inicio from "./views/Inicio";
import Perfil from "./views/Perfil";
import Users from "./views/Users";
import ProtectedRoute from "./auth/protectedRoute";

function Default() {
  return (
    <></>
  )
}

/*Enrutador de la web*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute defaultComponent={Login} userComponent={Default} />,
  },
  {
    path: "/registro",
    element: <ProtectedRoute defaultComponent={Registro} userComponent={Default} />,
  },
  {
    path: "/inicio",
    element: <ProtectedRoute defaultComponent={Default} userComponent={Inicio} />,
  },
  {
    path: "/perfil",
    element: <ProtectedRoute defaultComponent={Default} userComponent={Perfil} />,
  },
  {
    path: "/usuarios",
    element: <ProtectedRoute defaultComponent={Default} userComponent={Users} />,
  },
  {
    path: "*",
    element: (
      <h2 className="text-3xl font-bold underline font-barlow-condensed">
        {" "}
        Pagina de Error
      </h2>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;