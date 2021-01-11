import React, { useEffect, useState } from "react";
import Controls from "./Controls";
import { Grid, makeStyles } from "@material-ui/core";
import { login } from "../RestServices/RestDataSource";
import { Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Alert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { giveAuthentication } from "../store/stateActions";
const serverErrorInitialValues = {
  error: false,
  errormessage: ""
};

const initialValues = {
  username: "",
  password: ""
};

const initialUser = {
  id: "",
  username: "",
  role: ""
};
const useStyles = makeStyles({
  button: {
    marginTop: "20px",
    textAlign: "center"
  },
  userlogo: {
    fontSize: "150px",
    color: "#1a237e"
  },
  formerror: {
    width: "45%",
    margin: "0",
    marginTop: "-50px",
    padding: "0",
    position: "fixed",
    textAlign: "center"
  }
});
const LoginForm = props => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialUser);
  const [serverError, setServerError] = useState(serverErrorInitialValues);
  const classes = useStyles();
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setError] = useState({});

  const handleChange = e => {
    setServerError({});
    const { name, value } = e.target;
    let values = { ...formValues, [name]: value };
    setFormValues(values);
    validate({ [name]: value });
  };

  const validate = (formData = formValues) => {
    let temp = { ...formError };
    temp.username = "";

    if ("username" in formData) {
      temp.username =
        formData.username.length < 1 ? "This Field is required" : "";
    }
    if ("password" in formData) {
      temp.password =
        formData.password.length < 8 ? "Please Enter a valid password" : "";
    }

    setError({
      ...temp
    });

    return Object.values(temp).every(x => x === "");
  };

  useEffect(() => {
    console.log(JSON.stringify(user));
    if (user.id) {
      console.log("Effect change" + JSON.stringify(user));
      dispatch(giveAuthentication(user));
    }
  }, [user]);
  const handleSubmit = e => {
    setUser({});
    e.preventDefault();
    if (validate(formValues)) {
      setFormValues(initialValues);
      login(formValues, setUser, setServerError);
      alert("FormSuccessfully submitted");
    } else {
      alert("Please enter the required fields");
    }
  };

  return (
    <>
      {serverError.errormessage && (
        <div className={classes.formerror}>
          <Alert elevation={6} severity="error">
            {`${serverError.errormessage}`}
          </Alert>
        </div>
      )}

      <Controls.Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item sm className={classes.button}>
            <AccountCircleIcon className={classes.userlogo} />
            <Typography
              component="h2"
              variant="subtitle1"
              align="center"
              color="primary"
            >
              Login Form
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controls.Input
              variant="outlined"
              label="Username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              error={formError.username}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controls.Input
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
              error={formError.password}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <div className={classes.button}>
              <Controls.Button StartIcon={ExitToAppIcon} type="submit">
                Login
              </Controls.Button>
            </div>
          </Grid>
        </Grid>
      </Controls.Form>
    </>
  );
};

export default LoginForm;
