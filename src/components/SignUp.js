import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Swal from "sweetalert2";
import Loader from "./Loader";
import axios from "axios";
import { Formik, Form, ErrorMessage } from "formik";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  helper: {
    color: "red",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const URL = process.env.REACT_APP_API_USERS;
  let history = useHistory();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     name.trim() !== "" &&
  //     lastName.trim() !== "" &&
  //     email.trim() !== "" &&
  //     password.trim() !== "" &&
  //     password === confirmPassword
  //   ) {
  //     setError(false);
  //     try {
  //       setLoading(true);
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };
  //       const { data } = await axios.post(
  //         URL,
  //         { name, lastName, email, password, role: "Regular" },
  //         config
  //       );
  //       localStorage.setItem("userInfo", JSON.stringify(data));
  //       setLoading(false);
  //       setError(false);
  //       Swal.fire("User was successfully registered", "", "success");
  //       history.push("/");
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //       setError(true);
  //     }
  //   } else {
  //     setError(true);
  //   }
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {loading && <Loader></Loader>}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "Regular",
          }}
          validate={(valores) => {
            let errores = {};
            // Name validation
            if (!valores.firstName) {
              errores.firstName = "Please enter a name";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.firstName)) {
              errores.firstName =
                "The name can only contain letters and spaces";
            }
            // Last Name validation
            if (!valores.lastName) {
              errores.lastName = "Please enter a last name";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastName)) {
              errores.lastName =
                "The last name can only contain letters and spaces";
            }

            // Email validation
            if (!valores.email) {
              errores.email = "Please enter an email";
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                valores.email
              )
            ) {
              errores.email =
                "Email can only contain letters, numbers, points, dashes and underscore";
            }

            // Password validation
            if (!valores.password) {
              errores.password = "Please enter a password";
            } else if (
              !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
                valores.password
              )
            ) {
              errores.password =
                "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character";
            }
            // Confirm validation
            if (!valores.confirmPassword) {
              errores.confirmPassword = "Please enter the password again";
            } else if (valores.confirmPassword !== valores.password) {
              errores.confirmPassword = "Passwords do not match";
            }

            return errores;
          }}
          onSubmit={async (valores, { resetForm }) => {
            console.log(valores);
            try {
              setLoading(true);
              const config = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
              const { data } = await axios.post(URL, valores, config);
              localStorage.setItem("userInfo", JSON.stringify(data));
              setLoading(false);
              resetForm();
              Swal.fire("User was successfully registered", "", "success");
              history.push("/");
            } catch (err) {
              console.log(err);
              setLoading(false);
            }
          }}
        >
          {({ handleChange, values, handleBlur, errors }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="firstName"
                    component={() => (
                      <FormHelperText className={classes.helper}>
                        {errors.firstName}
                      </FormHelperText>
                    )}
                  ></ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleChange}
                    value={values.lastName}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="lastName"
                    component={() => (
                      <FormHelperText className={classes.helper}>
                        {errors.lastName}
                      </FormHelperText>
                    )}
                  ></ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <FormHelperText className={classes.helper}>
                        {errors.email}
                      </FormHelperText>
                    )}
                  ></ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <FormHelperText className={classes.helper}>
                        {errors.password}
                      </FormHelperText>
                    )}
                  ></ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="confirmPassword"
                    label="Comfirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component={() => (
                      <FormHelperText className={classes.helper}>
                        {errors.confirmPassword}
                      </FormHelperText>
                    )}
                  ></ErrorMessage>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
