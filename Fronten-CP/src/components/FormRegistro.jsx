import { useContext, useState } from "react";
import { FaLock, FaRegUser, FaUser, FaUserCircle } from "react-icons/fa";
import { MdEmail, MdLockPerson } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import formValidation from "../validation/validations";
import { alertInfo } from "../alerts/alerts";
import { Context } from "../context/Context";

function FormRegistro() {
  const navigate = useNavigate();
  const { peticionRegister } = useContext(Context);
  
  const [values, setValues] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
    lastname: "",
    email: ""
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
    const passwordValidate = formValidation.validatePasswords(
      values.password,
      values.passwordConfirm
    );
    if (validate) return alertInfo(validate);
    if (passwordValidate === false)
      return alertInfo("Las claves deben coincidir");

    const respuesta = await peticionRegister(values);
    if (respuesta) {
      navigate("/");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-5/6 lg:w-4/6 h-auto gap-4 flex flex-col items-center justify-center"
      >
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
        <div className="flex flex-col gap-4 w-full lg:flex-row items-center justify-center">
          <div className="flex gap-2 w-full lg:w-1/2 items-center justify-center">
            <input
              name="name"
              id="name"
              value={values.name}
              onChange={handleInputChange}
              placeholder="Nombre"
              type="text"
              className="bg-gris-neutro rounded-md border border-azul-claro text-sm md:text-base px-2 py-1 md:py-2 w-full"
            />
            <FaUser className="text-xl md:text-3xl text-negro" />
          </div>
          <div className="flex gap-2 w-full lg:w-1/2 items-center justify-center">
            <input
              name="lastname"
              id="lastname"
              value={values.lastname}
              onChange={handleInputChange}
              placeholder="Apellido"
              type="text"
              className="bg-gris-neutro rounded-md border border-azul-claro text-sm md:text-base px-2 py-1 md:py-2 w-full"
            />
            <FaRegUser className="text-xl md:text-3xl text-negro" />
          </div>
        </div>
        <div className="flex gap-2 w-full items-center justify-center">
          <input
            name="email"
            id="email"
            value={values.email}
            onChange={handleInputChange}
            placeholder="Correo"
            type="email"
            className="bg-gris-neutro rounded-md border border-azul-claro text-sm md:text-base px-2 py-1 md:py-2 w-full"
          />
          <MdEmail className="text-xl md:text-3xl text-negro" />
        </div>
        <div className="flex flex-col gap-4 w-full lg:flex-row items-center justify-center">
          <div className="flex gap-2 w-full lg:w-1/2 items-center justify-center">
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
          <div className="flex gap-2 w-full lg:w-1/2 items-center justify-center">
            <input
              name="passwordConfirm"
              id="passwordConfirm"
              value={values.passwordConfirm}
              onChange={handleInputChange}
              placeholder="Confirmar Clave"
              type="password"
              className="bg-gris-neutro rounded-md border border-azul-claro text-sm md:text-base px-2 py-1 md:py-2 w-full"
            />
            <MdLockPerson className="text-xl md:text-3xl text-negro" />
          </div>
        </div>

        <div className="w-full flex gap-2 justify-end">
          <Link
            to={"/"}
            className="text-sm md:text-md w-2/6 lg:w-1/5 flex justify-center bg-azul-brillante text-blanco px-2 py-1 md:py-2 font-medium rounded-md hover:bg-azul-claro transition-all duration-500"
          >
            Login
          </Link>
          <button
            type="submit"
            className="text-sm md:text-md w-2/6 lg:w-1/5 flex justify-center bg-azul-brillante text-blanco px-2 py-1 md:py-2 font-medium rounded-md hover:bg-azul-claro transition-all duration-500"
          >
            Registro
          </button>
        </div>
      </form>
    </>
  );
}

export default FormRegistro;