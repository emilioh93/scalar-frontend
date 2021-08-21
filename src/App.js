import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Footer from "./components/common/Footer";
import Details from "./components/Details";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useState, useEffect } from "react";
import Error404 from "./components/Error404";
import { Provider } from "react-redux";
import { store } from "./Redux/store/store";
import { UserContext } from "./Context/UserContext";

function App() {
  const [movies, setMovies] = useState();
  const [logged, setLogged] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(null);

  // FIXME: problems checking the role when reloading the page

  const consultMovies = async () => {
    await fetch(process.env.REACT_APP_API_MOVIES)
      .then((response) => response.json())
      .then((data) => setMovies(data));
  };

  const checkUser = () => {
    if (localStorage.getItem("userInfo")) {
      setLogged(true);
      console.log("There is a user logged in");
    } else {
      console.log("No user logged in");
    }
  };

  const checkRole = () => {
    if (logged) {
      const role = JSON.parse(localStorage.getItem("userInfo")).role;
      if (role === "Admin") {
        setAdmin(true);
        console.log("Is admin user");
      } else {
        console.log("Is regular user");
      }
    } else {
      console.log("I can't check the role");
    }
  };

  useEffect(() => {
    checkUser();
    checkRole();
    consultMovies();
  }, []);

  return (
    <div>
      <Provider store={store}>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Navbar
              logged={logged}
              setLogged={setLogged}
              admin={admin}
              setAdmin={setAdmin}
            ></Navbar>
            <Switch>
              <Route exact path="/">
                <Home movies={movies} />
              </Route>
              <Route exact path="/login">
                <Login
                  logged={logged}
                  setLogged={setLogged}
                  checkRole={checkRole}
                />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/details/:id">
                <Details />
              </Route>
              <Route
                exact
                path="/dashboard"
                render={() => {
                  return admin ? (
                    <Dashboard consultMovies={consultMovies} movies={movies} />
                  ) : (
                    <Redirect to="/"></Redirect>
                  );
                }}
              ></Route>
              <Route path="*">
                <Error404 />
              </Route>
            </Switch>
            <Footer />
          </BrowserRouter>
        </UserContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
