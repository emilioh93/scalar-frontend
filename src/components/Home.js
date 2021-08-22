import { Container, FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import MovieList from "./MovieList";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  formControl: {
    marginBottom: "20px",
  },
}));

const Home = ({ movies }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    sortMovies(e.target.value);
  };

  const sortMovies = (e) => {
    if (e === "10") {
      movies.sort((a, b) => {
        console.log("Ordenar por nombre");
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else if (e === "20") {
      movies.sort((a, b) => {
        console.log("Ordenar por date");
        if (a.date.toLowerCase() < b.date.toLowerCase()) {
          return -1;
        }
        if (a.date.toLowerCase() > b.date.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else if (e === "30") {
      movies.sort((a, b) => {
        console.log("Ordenar por raiting");
        return b.raiting - a.raiting;
      });
    }
  };

  return (
    <Container>
      <div className={classes.title}>
        <h1>NOW PLAYING & COMING SOON</h1>
      </div>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-option-native-simple">
            Sort by
          </InputLabel>
          <Select value={value} native onChange={handleChange} label="Option">
            <option aria-label="None" value="" />
            <option value="10">Name</option>
            <option value="20">Date</option>
            <option value="30">Raiting</option>
          </Select>
        </FormControl>
      </div>
      <MovieList movies={movies}></MovieList>
    </Container>
  );
};

export default Home;
