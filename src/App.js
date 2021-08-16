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

function App() {
  const [movies, setMovies] = useState();

  const consultMovies = async () => {
    await fetch(process.env.REACT_APP_API_MOVIES)
      .then((response) => response.json())
      .then((data) => setMovies(data));
  };

  useEffect(() => {
    consultMovies();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Navbar></Navbar>
          <Switch>
            <Route exact path={routes.home}>
              <Home movies={movies} />
            </Route>
            <PublicRoute exact path={routes.login}>
              <Login />
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
          </Switch>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
