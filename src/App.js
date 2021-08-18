import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Footer from "./components/common/Footer";
import Details from "./components/Details";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useState } from "react";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./auth/AuthProvider";
import PublicRoute from "./components/PublicRoute";
import roles from "./helpers/roles";
import routes from "./helpers/routes";
import Error404 from "./components/Error404";

function App() {
  const [movies, setMovies] = useState();
  const [user, setUser] = useState(false);

  const consultUser = async () => {
    if (localStorage.getItem("userInfo")) {
      setUser(true);
      console.log("Hay un usuario logeado");
    } else {
      setUser(false);
      console.log("No hay un usuario logeado");
    }
  };

  const consultMovies = async () => {
    await fetch(process.env.REACT_APP_API_MOVIES)
      .then((response) => response.json())
      .then((data) => setMovies(data));
  };

  useEffect(() => {
    consultMovies();
    consultUser();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Navbar user={user} consultUser={consultUser}></Navbar>
          <Switch>
            <Route exact path={routes.home}>
              <Home movies={movies} />
            </Route>
            <PublicRoute exact path={routes.login}>
              <Login setUser={setUser} />
            </PublicRoute>
            <PublicRoute exact path={routes.signup}>
              <SignUp />
            </PublicRoute>
            <Route exact path={routes.details()}>
              <Details />
            </Route>
            <PrivateRoute hasRole={roles.admin} exact path={routes.dashboard}>
              <Dashboard consultMovies={consultMovies} movies={movies} />
            </PrivateRoute>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
