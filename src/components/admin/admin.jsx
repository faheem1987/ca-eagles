import React, { Component, Fragment } from "react"
import { connect } from "react-redux"

import FormInput from "../common/form-input"
import CustomButton from "../common/custom-button"
import AdminForm from "./admin-form"
import { login } from "../../store/login/login.actions"
import { resetSuccessMessage } from "../../store/form/form.actions"

class Admin extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
    this.state = {
      email: "",
      password: "",
    }
  }

  handleSumbit(e) {
    e.preventDefault()
    this.props
      .login(this.state)
      .then(() => this.setState({ email: "", password: "" }))
  }

  handleChange(e) {
    const { value, name } = e.target

    this.setState({ [name]: value })
  }

  loginForm() {
    const { isLoading, error } = this.props
    return (
      <form onSubmit={this.handleSumbit} className="login-form content">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <FormInput
          type="text"
          name="email"
          value={this.state.email}
          handleChange={this.handleChange}
          label="Email"
          required
        />

        <FormInput
          type="password"
          name="password"
          value={this.state.password}
          handleChange={this.handleChange}
          label="Password"
          required
        />
        <CustomButton
          className="btn btn-primary"
          isLoading={isLoading}
          text="Sign in"
          type="submit"
        />
      </form>
    )
  }

  render() {
    const { auth, resetSuccessMessage } = this.props
    return (
      <>
        {auth.uid ? (
          <AdminForm resetSuccessMessage={resetSuccessMessage} />
        ) : (
          this.loginForm()
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  auth: state.firebase.auth,
  error: state.auth.error,
})

export default connect(mapStateToProps, {
  login,
  resetSuccessMessage,
})(Admin)
