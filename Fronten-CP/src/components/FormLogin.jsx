import { useContext, useState } from "react";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import formValidation from "../validation/validations";
import { alertInfo } from '../alerts/alerts';
import { Context } from "../context/Context";

function FormLogin() {
  const navigate = useNavigate();
  const { peticionLogin } = useContext(Context);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

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
    const validate = validation();
    if (validate) return alertInfo(validate);

    const respuesta = await peticionLogin(values)
    if (respuesta) {
      navigate('/Inicio')
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-5/6 lg:w-4/6 h-auto gap-4 flex flex-col items-center justify-center">
        <h2 className="text-negro text-2xl md:text-3xl font-bold text-center">
          Iniciar Sesión
        </h2>

        <div className="flex gap-2 w-full items-center justify-center">
          <input
            name="username"
            id="username"
            value={values.username}
            onChange={handleInputChange}
            placeholder="Usuario"
            type="text"
            className="bg-gris-neutro rounded-md border border-azul-claro text-sm md:text-base px-2 py-1 md:py-2 w-full"
          />
          <FaUserCircle className="text-xl md:text-3xl text-negro" />
        </div>
        <div className="flex gap-2 w-full items-center justify-center">
          <input
            name="password"
            id="password"
            value={values.password}
            onChange={handleInputChange}
            placeholder="Clave"
            type="password"
            className="bg-gris-neutro rounded-md border border-azul-claro text-sm md:text-base px-2 py-1 md:py-2 w-full"
          />
          <FaLock className="text-xl md:text-3xl text-negro" />
        </div>

        <div className="w-full flex gap-2 justify-end">
          <Link
            to={"/registro"}
            className="text-sm md:text-md w-2/6 lg:w-1/5 flex justify-center bg-azul-brillante text-blanco px-2 py-1 md:py-2 font-medium rounded-md hover:bg-azul-claro transition-all duration-500"
          >
            Registro
          </Link>
          <button
            type="submit"
            className="text-sm md:text-md w-2/6 lg:w-1/5 flex justify-center bg-azul-brillante text-blanco px-2 py-1 md:py-2 font-medium rounded-md hover:bg-azul-claro transition-all duration-500"
          >
            Entrar
          </button>
        </div>
      </form>
    </>
  );
}

export default FormLogin;
