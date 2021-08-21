import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [admin, setAdmin] = useState();
  const [user, setUser] = useState();
  const userStorage = localStorage.getItem("userInfo");

  const login = (data) => {
    setUser(data);
    setLogged(true);
    console.log(data.role);
    checkRole(data.role);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    setAdmin(false);
    Swal.fire("User session closed", "", "success");
  };

  const checkUser = () => {
    if (userStorage) {
      setLogged(true);
      console.log("There is a user logged in");
    } else {
      console.log("No user logged in");
    }
  };

  const checkRole = (user) => {
    if (user) {
      if (user === "Admin") {
        setAdmin(user);
        console.log("Is admin user");
      } else {
        console.log("Is regular user");
      }
    } else {
      console.log("I can't check the role");
    }
  };

  console.log(admin);

  return (
    <div>
      <UserContext.Provider
        value={{ checkUser, user, admin, login, logged, setLogged, logout }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserProvider;
