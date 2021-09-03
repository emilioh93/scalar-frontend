import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Footer from "./components/common/Footer";
import Details from "./components/Details";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useState, useEffect, useContext } from "react";
import Error404 from "./components/Error404";
import { UserContext } from "./Context/UserContext";

function App() {
  const [movies, setMovies] = useState();
  const { admin, checkUser } = useContext(UserContext);
  const [navbarFlag, setNavbarFlag] = useState(true);

  const consultMovies = async () => {
    await fetch(process.env.REACT_APP_API_MOVIES)
      .then((response) => response.json())
      .then((data) => setMovies(data));
  };

  useEffect(() => {
    consultMovies();
    checkUser();
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Navbar navbarFlag={navbarFlag}></Navbar>
      <Switch>
        <Route exact path="/">
          <Home movies={movies}/>
        </Route>
        <Route exact path="/login">
          <Login />
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
            return admin === "Admin" ? (
              <Dashboard
                setNavbarFlag={setNavbarFlag}
                consultMovies={consultMovies}
                movies={movies}
              />
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
  );
}

export default App;
