import { createContext, useEffect, useState } from "react";
import peticiones from '../validation/peticiones'
import { alertConfirm, alertError } from "../alerts/alerts";
import Swal from 'sweetalert2'

export const Context = createContext();

export function ContextoProvider(props) {
  const [storage, setStorage] = useState([]);
  const [storageCopy, setStorageCopy] = useState([]);
  const [car, setCar] = useState([]);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") === null ? "Invalid" : "Invalid" //localStorage.getItem("token")
  );
  const [user, setUser] = useState(null);

  // Peticion a la api para iniciar sesion
  function peticionLogin(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.loginUser, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setToken(response.token);
            setUser(response.result);
            alertConfirm(response.message);
            localStorage.setItem("token", response.token);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para registrar usuarios
  function peticionRegister(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.registerUser, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para ver los productos
  function peticionAllProducts() {
    return new Promise((resolve, reject) => {
      fetch(peticiones.allProducts, {
        mode: "cors",
        method: "GET", // or 'PUT'
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setStorage(response.result);
            setStorageCopy(response.result);
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para ver los productos
  function peticionAllUsers() {
    return new Promise((resolve, reject) => {
      fetch(peticiones.allUsers, {
        mode: "cors",
        method: "GET", // or 'PUT'
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setUsers(response.result);
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Funcion de cerrar sesion
  function actionLogout() {
    setToken("Invalid");
    setCar([]);
    setUser(null);
    alertConfirm("Se cerro la sesion exitosamente");
  }

  // Funcion de cerrar sesion
  async function filtrado(category) {
    if (category === "todos") {
      await peticionAllProducts()
      return
    }
    const newStorage = [];
    storageCopy.map((item) => {
      if (item.category === category) {
        newStorage.push(item);
      }
    });
    setStorage(newStorage);
    alertConfirm("Fitrado en la categoria: " + category)
  }

  // Peticion a la api para agregar los productos
  function peticionAddProducts(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.addProduct, {
        mode: "cors",
        method: "POST", // or 'PUT'
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setStorage([...storage, response.result]);
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para agregar los productos
  function peticionEditProducts(data, id) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.editProduct + id, {
        mode: "cors",
        method: "PUT", // or 'PUT'
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            const newStorage = [];
            storage.map((item) => {
              if (item._id === id) {
                newStorage.push(response.result);
              } else {
                newStorage.push(item);
              }
            });
            setStorage(newStorage);
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para eliminar los productos
  function peticionDeleteProducts(id) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        icon: "question",
        title: "Estas seguro que quieres eliminar el producto?",
        showDenyButton: true,
        confirmButtonText: "Cancelar",
        denyButtonText: `Confirmar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Ten mas cuidado la proxima vez", "", "info");
        } else if (result.isDenied) {
          fetch(peticiones.deleteProduct + id, {
            mode: "cors",
            method: "DELETE", // or 'PUT'
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.status < 210 && response.status >= 200) {
                const newStorage = storage.filter((item) => item._id !== id);
                setStorage(newStorage);
                alertConfirm(response.message);
                resolve(true);
              }
              if (response.status < 410 && response.status >= 400) {
                alertError(response.message);
                resolve(false);
              }
              if (response.status < 510 && response.status >= 500) {
                alertError(response.message);
                resolve(false);
              }
            });
        }
      });
    });
  }

  // Peticion a la api para editar usuarios
  function peticionEditUser(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.editPerfil, {
        mode: "cors",
        method: "PUT", // or 'PUT'
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          console.log(response);
          if (response.status < 210 && response.status >= 200) {
            setUser(response.result);
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para editar la clave
  function peticionEditPassword(data) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.editPassword, {
        mode: "cors",
        method: "PUT", // or 'PUT'
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            alertConfirm(response.message);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
  }

  // Peticion a la api para eliminar los cuenta
  function peticionDeleteUsers() {
    return new Promise((resolve, reject) => {
      Swal.fire({
        icon: "question",
        title: "Estas seguro que quieres eliminar la cuenta?",
        showDenyButton: true,
        confirmButtonText: "Cancelar",
        denyButtonText: `Confirmar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Ten mas cuidado la proxima vez", "", "info");
        } else if (result.isDenied) {
          fetch(peticiones.deleteUser, {
            mode: "cors",
            method: "DELETE", // or 'PUT'
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.status < 210 && response.status >= 200) {
                setToken("Invalid");
                alertConfirm(response.message);
                resolve(true);
              }
              if (response.status < 410 && response.status >= 400) {
                alertError(response.message);
                resolve(false);
              }
              if (response.status < 510 && response.status >= 500) {
                alertError(response.message);
                resolve(false);
              }
            });
        }
      });
    });
  }

  // Peticion a la api para agregar al carrito
  function peticioAddToCar(id) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        icon: "question",
        title: "Estas seguro que quieres Comprar el producto?",
        showDenyButton: true,
        confirmButtonText: "Cancelar",
        denyButtonText: `Confirmar`,
        denyButtonColor: "#007BFF",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Ten mas cuidado la proxima vez", "", "info");
        } else if (result.isDenied) {
          fetch(peticiones.addCar + id, {
            mode: "cors",
            method: "POST", // or 'PUT'
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              if (response.status < 210 && response.status >= 200) {
                setCar([...car, response.result]);
                const newStorage = [];
                storage.map((item) => {
                  if (item._id === id) {
                    item.amount = item.amount - 1;
                    newStorage.push(item);
                  } else {
                    newStorage.push(item);
                  }
                });
                setStorage(newStorage);
                alertConfirm(response.message);
                resolve(true);
              }
              if (response.status < 410 && response.status >= 400) {
                alertError(response.message);
                resolve(false);
              }
              if (response.status < 510 && response.status >= 500) {
                alertError(response.message);
                resolve(false);
              }
            });
        }
      });
    });
  }

  // Añadir al carrito

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        peticionLogin,
        user,
        setUser,
        peticionRegister,
        actionLogout,
        storage,
        peticionAllProducts,
        users,
        peticionAllUsers,
        peticionAddProducts,
        peticionDeleteProducts,
        peticionEditPassword,
        peticionEditUser,
        peticionDeleteUsers,
        peticionEditProducts,
        peticioAddToCar,
        car,
        filtrado
      }}
    >
      {props.children}
    </Context.Provider>
  );
}