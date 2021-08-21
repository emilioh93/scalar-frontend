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
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     history.push("/");
  //   }
  // }, [history]);

  return (
    <Container>
      <div className={classes.title}>
        <h1>NOW PLAYING & COMING SOON</h1>
      </div>
      <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Sort by</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          label="Age"
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Date</option>
          <option value={20}>Raiting</option>
        </Select>
      </FormControl>
      </div>
      <MovieList movies={movies}></MovieList>
    </Container>
  );
};

export default Home;
