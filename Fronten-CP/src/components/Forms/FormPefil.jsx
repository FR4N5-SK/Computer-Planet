import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import formValidation from "../../validation/validations";
import { alertInfo } from "../../alerts/alerts";

function FormPerfil({edit, editPassword}) {
  const { user, peticionEditUser, peticionEditPassword } = useContext(Context);

  const [values, setValues] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    location: user.location,
    phone: user.phone,
  });
  const [passwords, setPasswords] = useState({
    username: user.username,
    password: "",
    passwordConfirm: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const validation = () => {
    for (let key in values) {
      let error = formValidation.validateText(values[key].toString());
      if (!error) return "Completa todos los datos";
    }
  };

  const validation2 = () => {
    for (let key in passwords) {
      let error = formValidation.validateText(passwords[key].toString());
      if (!error) return "Completa todos los datos";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      const validate = validation();
      if (validate) return alertInfo(validate);
      await peticionEditUser(values);
    }

    if (editPassword) {
      const validate2 = validation2();
      if (validate2) return alertInfo(validate2);
      const passwordValidate = formValidation.validatePasswords(
        passwords.password,
        passwords.passwordConfirm
      );
      if (passwordValidate === false) return alertInfo("Las claves deben coincidir");
      await peticionEditPassword(passwords);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h4 className="text-center mb-8 text-lg font-semibold">
          Perfil de Usuario
        </h4>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-medium">
                Nombre:
              </label>
              <input
                name="name"
                id="name"
                value={values.name}
                disabled={edit ? "" : "disabled"}
                onChange={handleInputChange}
                type="text"
                className="w-full bg-gris-neutro rounded-md border border-azul-brillante text-xs px-3 p-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastname" className="text-sm font-medium">
                Apellidos:
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={values.lastname}
                disabled={edit ? "" : "disabled"}
                onChange={handleInputChange}
                className="w-full bg-gris-neutro rounded-md border border-azul-brillante text-xs px-3 p-2"
              />
            </div>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-sm font-medium">
                Telefono:
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={values.phone}
                disabled={edit ? "" : "disabled"}
                onChange={handleInputChange}
                className="w-full bg-gris-neutro rounded-md border border-azul-brillante text-xs px-3 p-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium">
                Correo:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                disabled={edit ? "" : "disabled"}
                onChange={handleInputChange}
                className="w-full bg-gris-neutro rounded-md border border-azul-brillante text-xs px-3 p-2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="location" className="text-sm font-medium">
              Direccion:
            </label>
            <textarea
              name="location"
              id="location"
              value={values.location}
              onChange={handleInputChange}
              disabled={edit ? "" : "disabled"}
              className="w-full bg-gris-neutro rounded-md border border-azul-brillante text-xs px-3 p-2"
            ></textarea>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium">
                Nueva clave:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={passwords.password}
                disabled={editPassword ? "" : "disabled"}
                onChange={handleInputChange2}
                className="w-full bg-gris-neutro rounded-md border border-azul-brillante text-xs px-3 p-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="passwordConfirm" className="text-sm font-medium">
                Confirmar clave:
              </label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                value={passwords.passwordConfirm}
                disabled={editPassword ? "" : "disabled"}
                onChange={handleInputChange2}
                className="w-full bg-gris-neutro rounded-md border border-azul-brillante text-xs px-3 p-2"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end mt-8 gap-2">
          <Link
            to={"/inicio"}
            className="w-2/6 md:w-1/4 py-2 px-4 text-sm font-semibold text-negro bg-azul-claro rounded-md hover:bg-azul-brillante text-center hover:text-blanco transition-all duration-500"
          >
            Cancelar
          </Link>
          <button type="submit" className="w-2/6 md:w-1/4 py-2 px-4 text-sm font-semibold text-negro bg-azul-claro rounded-md hover:bg-azul-brillante hover:text-blanco transition-all duration-500">
            Actualizar
          </button>
        </div>
      </form>
    </>
  );
}

export default FormPerfil;
