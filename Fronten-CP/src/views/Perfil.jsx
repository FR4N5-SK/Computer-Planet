import { FaCircleUser } from "react-icons/fa6";
import Nav from "../components/Nav";
import FormPerfil from "../components/Forms/FormPefil";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const navigate = useNavigate();
  const { peticionDeleteUsers } = useContext(Context);

  const [edit, setEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  return (
    <>
      <header className="fixed z-50 w-full">
        <Nav />
      </header>

      <main className="pt-[13.5vh] min-h-[100vh] w-full pb-[6vh] bg-gris-neutro relative flex justify-center items-center">
        <section className="bg-blanco border flex flex-col lg:flex-row gap-12 border-azul-brillante w-[90%] px-4 py-10 h-auto rounded-lg">
          <div className="flex flex-col lg:w-2/6 gap-4 justify-center items-center border-b border-negro lg:border-b-0 lg:border-r">
            <h4 className="text-lg font-semibold">Usuario</h4>
            <FaCircleUser className="text-7xl" />
            <div className="flex flex-col gap-2 w-full items-center">
              <button
                onClick={(e) => setEdit(!edit)}
                className={`${
                  edit ? "bg-azul-brillante" : "bg-azul-claro"
                } w-4/6 md:w-2/6 lg:w-4/6 xl:w-3/6 px-4 py-2  rounded-md font-medium text-base hover:bg-azul-brillante transition-all duration-500 hover:text-blanco`}
              >
                Editar Perfil
              </button>
              <button
                onClick={(e) => setEditPassword(!editPassword)}
                className={`${
                  editPassword ? "bg-azul-brillante" : "bg-azul-claro"
                } w-4/6 md:w-2/6 lg:w-4/6 xl:w-3/6 px-4 py-2 bg-azul-claro rounded-md font-medium text-base hover:bg-azul-brillante transition-all duration-500 hover:text-blanco`}
              >
                Cambiar Clave
              </button>
              <button
                onClick={async (e) => {
                  await peticionDeleteUsers();
                  navigate('/')
                }}
                className="w-4/6 md:w-2/6 lg:w-4/6 xl:w-3/6 px-4 py-2 bg-azul-claro rounded-md font-medium text-base hover:bg-azul-brillante transition-all duration-500 hover:text-blanco"
              >
                Eliminar Cuenta
              </button>
            </div>
          </div>

          <div className="mt-10 lg:w-4/6">
            <FormPerfil editPassword={editPassword} edit={edit} />
          </div>
        </section>
      </main>
    </>
  );
}
  
  export default Perfil;