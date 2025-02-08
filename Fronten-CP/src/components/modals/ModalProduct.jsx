import { useContext, useState } from "react";
import formValidation from "../../validation/validations";
import { alertInfo } from "../../alerts/alerts";
import { Context } from "../../context/Context";

function ModalProduct({ modal, setModal, edit, product }) {
  const { peticionAddProducts, peticionEditProducts } = useContext(Context);

  const [values, setValues] = useState(edit ? {
    name: product.name,
    description: product.description,
    price: product.price,
    currency: product.currency,
    amount: product.amount,
    image: product.image,
    category: product.category,
  } :{
    name: "",
    description: "",
    price: "",
    currency: "",
    amount: "",
    image: "",
    category: "",
  });
  const [fileName, setFileName] = useState("");

  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file") {
      setValues((prevState) => ({
        ...prevState,
        image: files[0],
      }));
      setFileName(files[0].name);
    } else {
      setValues((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const validation = () => {
    for (let key in values) {
      let error = formValidation.validateText(values[key].toString());
      if (!error) return "Completa todos los datos";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) return alertInfo(validate);

    const formDataToSend = new FormData();
    formDataToSend.append("name", values.name);
    formDataToSend.append("amount", values.amount);
    formDataToSend.append("category", values.category);
    formDataToSend.append("currency", values.currency);
    formDataToSend.append("description", values.description);
    formDataToSend.append("price", values.price);
    formDataToSend.append("image", values.image);

    if (edit) {
        await peticionEditProducts(formDataToSend, product._id);
    } else {
        await peticionAddProducts(formDataToSend);
        setValues({
          name: "",
          description: "",
          price: "",
          currency: "",
          amount: "",
          image: "",
          category: "",
        });
    }
    setModal(!modal)
  };

  return (
    <>
      <section
        class={`${
          modal ? "visible" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed bg-negro bg-opacity-45 flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[100vh]`}
      >
        <div class="relative p-4 w-full max-w-md lg:max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {edit
                  ? "Panel de Editar Productos"
                  : "Panel de Agregar Productos"}
              </h3>
              <button
                onClick={(e) => setModal(!modal)}
                type="button"
                class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  class="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="p-4 md:p-5">
              <form class="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Nombre:
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={values.name}
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Ejemplo: Play 5"
                    required
                  />
                </div>

                <div>
                  <label
                    for="description"
                    class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Descripcion:
                  </label>
                  <textarea
                    onChange={handleInputChange}
                    value={values.description}
                    name="description"
                    id="description"
                    placeholder="Descripcion..."
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="w-full lg:w-1/2">
                    <label
                      for="price"
                      class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Precio:
                    </label>
                    <input
                      onChange={handleInputChange}
                      value={values.price}
                      type="number"
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Ejemplo: 800"
                      required
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <label
                      for="currency"
                      class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Moneda:
                    </label>
                    <input
                      onChange={handleInputChange}
                      value={values.currency}
                      type="text"
                      name="currency"
                      id="currency"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Ejemplo: Bs."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="amount"
                    class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Cantidad:
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={values.amount}
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Ejemplo: 12"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    for="category"
                    class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Categoria:
                  </label>
                  <select
                    name="category"
                    id="category"
                    required
                    onChange={handleInputChange}
                    value={values.category}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  >
                    <option value=""></option>
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

                <div>
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="image"
                  >
                    Imagen:
                  </label>
                  <input
                    onChange={handleInputChange}
                    class="py-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    aria-describedby="image"
                    id="image"
                    name="image"
                    type="file"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {edit ? "Editar producto" : "Agregar producto"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ModalProduct;
