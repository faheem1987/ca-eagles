import React, { useState } from "react";
import { connect } from "react-redux";

import AlertSection from "../common/alert";
import FormInput from "../common/form-input";
import CustomButton from "../common/custom-button";
import { login } from "../../store/login/login.actions";
import { resetSuccessMessage } from "../../store/form/form.actions";

const Login = (props) => {
  const [state, setState] = useState({
    email: { value: "", error: null },
    password: { value: "", error: null },
    globalError: null,
  });

  const handleSumbit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    if (email.error || !password.value) {
      return setState({
        ...state,
        globalError: "Check your email and password",
      });
    }
    return props
      .login({ email: email.value, password: password.value })
      .then(() =>
        setState({
          ...state,
          globalError: null,
          email: {
            value: "",
            error: null,
          },
          password: {
            value: "",
            error: null,
          },
        })
      );
  };

  const handleChange = (e, s) => {
    const v = e.target.value;
    setState({
      ...state,
      [s]: {
        ...[s],
        value: v,
      },
    });
  };

  const handleBlur = () => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(state.email.value)) {
      return setState({
        ...state,
        email: {
          value: state.email.value,
          error: "Please check you email address",
        },
      });
    }

    setState({
      ...state,
      email: {
        value: state.email.value,
        error: null,
      },
    });
  };

  const { isLoading, error } = props;
  const { email, password, globalError } = state;
  return (
    <form onSubmit={handleSumbit} className="login-form">
      <h4>Sign in to your account</h4>
      {(error || globalError) && <AlertSection error={error || globalError} />}
      <FormInput
        className={email.error ? "danger" : ""}
        type="text"
        name="email"
        value={email.value}
        handleChange={(e) => handleChange(e, "email")}
        label="Email"
        onBlur={handleBlur}
        error={email.error}
      />

      <FormInput
        type="password"
        name="password"
        value={password.value}
        handleChange={(e) => handleChange(e, "password")}
        label="Password"
      />
      <CustomButton
        className="btn btn-primary login-btn"
        isLoading={isLoading}
        text="Sign in"
        type="submit"
      />
    </form>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
});

export default connect(mapStateToProps, {
  login,
  resetSuccessMessage,
})(Login);
