import { useContext, useState } from "react";
import admin from "../assets/admin.jpg"
import perfil from "../assets/perfil.png"
import formValidation from "../validation/validations";
import { Context } from "../context/Context";
import { alertInfo } from "../alerts/alerts";

function CardUser({item}) {
    const { peticionEditPassword } = useContext(Context);

    const [menu, setMenu] = useState(false)
    const [modal, setModal] = useState(false)
    const [passwords, setPasswords] = useState({
      username: item.username,
      password: "",
      passwordConfirm: "",
    });

    const handleInputChange2 = (e) => {
      const { name, value } = e.target;
      setPasswords({
        ...passwords,
        [name]: value,
      });
    };

    const validation2 = () => {
      for (let key in passwords) {
        let error = formValidation.validateText(passwords[key].toString());
        if (!error) return "Completa todos los datos";
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault()
      const validate2 = validation2();
      if (validate2) return alertInfo(validate2);
      const passwordValidate = formValidation.validatePasswords(
        passwords.password,
        passwords.passwordConfirm
      );
      if (passwordValidate === false)
        return alertInfo("Las claves deben coincidir");
      await peticionEditPassword(passwords);
    };

  return (
    <>
      <div className="w-full sm:w-[45%] lg:w-[30%] xl:w-[23%] bg-gris-neutro border relative border-gray-400 rounded-lg shadow-sm">
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={(e) => setMenu(!menu)}
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          <div
            className={`z-10 ${
              menu ? "scale-1" : "scale-0"
            } transition-all duration-300 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-3/4 dark:bg-gray-700`}
          >
            <ul className="py-2">
              <li>
                <p href="#" className="block px-4 py-2 text-sm text-gray-700">
                  {item.phone}
                </p>
              </li>
              <li>
                <p href="#" className="block px-4 py-2 text-sm text-gray-700">
                  {item.location}
                </p>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => setMenu(!menu)}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Cerrar
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={item.role === "admin" ? admin : perfil}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {item.user}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {item.name} {item.lastname}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {item.email}
          </span>
          <div className="flex mt-4 md:mt-6">
            <button
              onClick={(e) => setModal(!modal)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4"
            >
              Cambiar Clave
            </button>
          </div>
        </div>
      </div>

      <section
        class={`${
          modal ? "visible" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed bg-negro bg-opacity-45 flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[100vh]`}
      >
        <div class="relative p-4 w-full max-w-md lg:max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Cambiar clave
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
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium">
                      Nueva clave:
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={passwords.password}
                      onChange={handleInputChange2}
                      className="w-full bg-gris-neutro rounded-md border border-azul-brillante text-xs px-3 p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="passwordConfirm"
                      className="text-sm font-medium"
                    >
                      Confirmar clave:
                    </label>
                    <input
                      type="password"
                      name="passwordConfirm"
                      id="passwordConfirm"
                      value={passwords.passwordConfirm}
                      onChange={handleInputChange2}
                      className="w-full bg-gris-neutro rounded-md border border-azul-brillante text-xs px-3 p-2"
                    />
                  </div>
                </div>

                <div className="flex w-full justify-end mt-8 gap-2">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 text-sm font-semibold text-negro bg-azul-claro rounded-md hover:bg-azul-brillante hover:text-blanco transition-all duration-500"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CardUser;
