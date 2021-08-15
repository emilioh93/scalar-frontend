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
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <Home movies={movies} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/details">
            <Details />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard consultMovies={consultMovies} movies={movies}/>
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
