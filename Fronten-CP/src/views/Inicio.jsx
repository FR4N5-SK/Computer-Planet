import Nav from "../components/Nav";
import Car from "../components/Car";
import Storage from "../components/Storage";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";

function Inicio() {
  const { storage, peticionAllProducts, filtrado } = useContext(Context);

  const [loader, setLoader] = useState(false)
  const [values, setValues] = useState({
    category: ""
  });

  useEffect(() => {
    setLoader(true)
    setTimeout(async () => {
      await peticionAllProducts()
      setLoader(false)
    }, 1000);
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validation = () => {
    for (let key in values) {
      let error = formValidation.validateText(values[key].toString());
      if (!error) return "Completa todos los datos";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    filtrado(values.category)
  };

  return (
    <>
      <header className="fixed z-50 w-full">
        <Nav />
      </header>

      <main className="pt-[7.5vh] h-auto w-full bg-gris-neutro relative min-h-[100vh]">
        <Car />
        <div className="w-full h-full px-4 py-8">
          <form onSubmit={handleSubmit} className="flex gap-4 mb-8 w-full">
            <div className="w-2/3 md:w-2/6 lg:w-3/12 xl:w-[200px]">
              <select
                name="category"
                id="category"
                required
                onChange={handleInputChange}
                value={values.category}
                class="w-full bg-blue-200 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              >
                <option value="todos">todos</option>
                <option value="computadores">computadores</option>
                <option value="procesador">Procesador</option>
                <option value="placa-madre">Placa Madre</option>
                <option value="memoria-ram">Memoria RAM</option>
                <option value="tarjeta-grafica">Tarjeta Gráfica</option>
                <option value="disco-duro">Disco Duro</option>
                <option value="ssd">SSD (Unidad de Estado Sólido)</option>
                <option value="fuente-alimentacion">
                  Fuente de Alimentación
                </option>
                <option value="case">Case (Gabinete)</option>
                <option value="ventiladores">Ventiladores</option>
                <option value="tarjeta-sonido">Tarjeta de Sonido</option>
              </select>
            </div>
            <button class="w-1/3 md:w-1/6 lg:w-1/12 xl:w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Filtrar
            </button>
          </form>
          {loader ? (
            <div className="flex items-center justify-center h-[92.5vh]">
              <div
                role="status"
                className="flex items-center justify-center flex-col"
              >
                <svg
                  aria-hidden="true"
                  class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
                <h6 className="font-semibold mt-2">Cargando...</h6>
              </div>
            </div>
          ) : storage.length === 0 ? (
            <h6 className="text-center text-xl font-semibold text-negro">
              No hay productos disponibles
            </h6>
          ) : (
            <Storage data={storage} type={"product"} />
          )}
        </div>
      </main>
    </>
  );
}

export default Inicio;
