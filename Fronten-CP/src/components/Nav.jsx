import { FaBars } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

function Nav() {
  const navigate = useNavigate();
  const { user, actionLogout } = useContext(Context);

  const [sideBar, setSideBar] = useState(false);

  const logout = e => {
    actionLogout()
    navigate('/')
  };

  return (
    <>
      <nav className="h-[7.5vh] z-30 bg-azul-claro flex justify-center items-center px-4 py-2 relative">
        <img
          src={logo}
          className="w-auto h-full"
          alt="Logo de Computer Planet"
        />

        <button
          className="absolute right-6"
          onClick={(e) => setSideBar(!sideBar)}
        >
          {sideBar ? (
            <FaXmark className="text-negro text-xl" />
          ) : (
            <FaBars className="text-negro text-xl" />
          )}
        </button>
      </nav>
      <ul
        className={`mt-[7.5vh] w-1/2 lg:w-1/6 md:w-4/12 rounded-md h-auto absolute transition-all duration-500 ${
          sideBar ? "top-2 right-2" : "-top-[500%]"
        } right-0 bg-gris-neutro border border-azul-brillante z-20`}
      >
        <div className="relative py-8 flex flex-col items-center font-medium text-negro">
          <li className="hover:text-azul-brillante text-center py-2 hover:bg-gray-200 w-full hover:cursor-pointer transition-all duration-500">
            <Link to={"/inicio"}>Inicio</Link>
          </li>
          {user.role === "admin" ? (
            <li className="hover:text-azul-brillante text-center py-2 hover:bg-gray-200 w-full hover:cursor-pointer transition-all duration-500">
              <Link to={"/usuarios"}>Usuarios</Link>
            </li>
          ) : (
            <></>
          )}
          <li className="hover:text-azul-brillante text-center py-2 hover:bg-gray-200 w-full hover:cursor-pointer transition-all duration-500">
            <Link to={"/perfil"}>Perfil</Link>
          </li>
          <li onClick={logout} className="hover:text-red-600 text-center py-2 hover:bg-gray-200 w-full hover:cursor-pointer transition-all duration-500">
            <button>Logout</button>
          </li>
        </div>
      </ul>
    </>
  );
}

export default Nav;
