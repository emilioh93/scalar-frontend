import { createStore } from "redux";

const initialData = {
  login: false,
  admin: false,
};

const user = (state = initialData, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, login: true };
    case "LOGOUT":
      return { ...initialData };
    case "IS_ADMIN":
      return { ...state, admin: true };
    case "IS_LOGGED":
      return { ...state, login: true };
    default:
      return state;
  }
};

// Crear store para almacenar estado de la aplicacion
let store = createStore(user);

// Suscripción a cambio
store.subscribe(() => {
  console.log(store.getState());
});

// Modifico el state despachando acciones
store.dispatch({ type: "LOGIN" });
store.dispatch({ type: "LOGOUT" });
store.dispatch({ type: "IS_ADMIN" });
store.dispatch({ type: "IS_LOGGED" });
