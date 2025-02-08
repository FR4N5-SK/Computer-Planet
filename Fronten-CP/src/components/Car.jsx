import { useContext, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import ModalProduct from "./modals/ModalProduct";
import { Context } from "../context/Context";
import Card2 from "./Card2";

function Car() {
    const [sideBar, setSideBar] = useState(false);
    const [modal, setModal] = useState(false);
      const { car } = useContext(Context);

  return (
    <>
      <div className="z-20 fixed flex items-center justify-center gap-2 bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
        <button
          onClick={(e) => setModal(!modal)}
          className={`flex items-center justify-center p-3 rounded-full ${
            sideBar ? "bg-blanco" : "bg-azul-claro"
          } border border-azul-brillante transition-all duration-500`}
        >
          <IoIosAddCircleOutline className="text-negro text-2xl" />
        </button>
        <button
          onClick={(e) => setSideBar(!sideBar)}
          className={`p-3 rounded-full ${
            sideBar ? "bg-blanco" : "bg-azul-claro"
          } border border-azul-brillante transition-all duration-500`}
        >
          <IoCartOutline className="text-negro text-2xl" />
          <span className="absolute p-1 text-xs bg-naranja-suave border border-azul-brillante rounded-full -top-1.5 -right-1.5">
            {car.length}
          </span>
        </button>
      </div>

      <section
        className={`fixed ${
          sideBar ? "right-0" : "-right-full"
        } z-10 w-full h-full pb-24 md:w-4/12 lg:w-3/12 p-6 flex justify-center bg-azul-claro transition-all duration-500`}
      >
        <div className="h-auto flex flex-col gap-6 overflow-y-auto ">
          <h3 className="text-negro font-semibold text-lg text-center mb-7">Productos del Carro</h3>
        {
          car.map((item) => (
            <Card2 item={item}/>
          ))
        }
        </div>
      </section>

      <ModalProduct modal={modal} setModal={setModal} edit={false}/>
    </>
  );
}

export default Car;