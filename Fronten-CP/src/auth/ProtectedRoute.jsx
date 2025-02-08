import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

export default function ProtectedRoute({
  defaultComponent: DefaultComponent,
  userComponent: UserComponent,
  adminComponent: AdminComponent,
}) {
  const navigate = useNavigate();
  const { token } = useContext(Context);
  const location = useLocation(); // Obtener la información de la ubicación actual
  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    const load = async () => {
        console.log(token)
      if (token === "Invalid") {
        if (currentPath === "/") {
            return navigate(currentPath);
        }
        if (currentPath === "/registro") {
            return navigate(currentPath);
        }
        return navigate("/");
      }
    };
    load();
  }, [currentPath, navigate]);

  return (
    <>
      {token === "Invalid" ? (<DefaultComponent />) : (<UserComponent />) }
    </>
  );
}
