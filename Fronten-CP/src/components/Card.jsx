import { useContext, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import ModalProduct from "./modals/ModalProduct";

function Card({ item }) {
  const { user, peticionDeleteProducts, peticioAddToCar } = useContext(Context);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  return (
    <>
      <li class="w-full relative sm:w-[45%] lg:w-[30%] xl:w-[23%] bg-gris-neutro border border-gray-400 rounded-lg shadow-sm">
          <img class="mb-8 w-full rounded-t-lg" src={`http://localhost:3080/api/uploads/${item.image}`} alt="product image" />
        <div class="px-5 pb-5">
          <a>
            <h5 class="text-base lg:text-lg font-bold tracking-tight text-gray-900">
              {item.name}
            </h5>
          </a>
          <p className="text-xs lg:text-sm mt-4 text-negro font-medium">
            <b className="text-azul-brillante">Cantidad:</b>{" "}
            <b
              className={
                item.amount > 10
                  ? `text-green-700`
                  : item.amount > 0
                  ? "text-amber-600"
                  : "text-red-700"
              }
            >
              {item.amount} Unidades
            </b>
          </p>
          <p className="text-xs lg:text-sm text-negro font-medium">
            <b className="text-azul-brillante">Descripcion:</b>{" "}
            <b
              className="hover:cursor-pointer"
              onClick={(e) => setModal(!modal)}
            >
              Ver mas...
            </b>
          </p>
          <div class="flex items-center justify-between mt-4 ">
            <span class="text-xl font-bold text-gray-900 dark:text-white">
              {item.price}{item.currency}
            </span>
            <a
              onClick={e => peticioAddToCar(item._id)}
              class="hover:cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Añadir al carro
            </a>
          </div>

          {user.role === "admin" ? (
            <div class="flex items-center justify-end mt-2 gap-4">
              <a
                onClick={e => setModal2(!modal2)}
                class="hover:cursor-pointer text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Editar
              </a>
              <a
                onClick={e => peticionDeleteProducts(item._id)}
                class="hover:cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Eliminar
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div
          className={`${
            modal ? "scale-1" : "scale-0"
          } transition-all duration-500 absolute top-0 right-0 bg-negro bg-opacity-35 w-full h-full rounded-lg flex flex-col justify-center items-center gap-2`}
        >
          <div className="bg-gris-neutro rounded-md w-[90%] h-[90%] p-4">
            <div className="h-[15%] flex w-full justify-end">
              <h6 className="w-full flex items-center font-semibold text-base">
                Descripcion
              </h6>
              <button onClick={(e) => setModal(!modal)}>
                <FaXmark />
              </button>
            </div>
            <div className="h-[85%] overflow-x-hidden overflow-y-scroll">
              <p className="text-sm">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </li>

      <ModalProduct modal={modal2} setModal={setModal2} edit={true} product={item}/>
    </>
  );
}

export default Card;
