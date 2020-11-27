import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormInput from './form-input';
import CustomButton from './custom-button';
import { login } from '../store/login/login.actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSumbit(e)  {
    e.preventDefault();
    this.props.login(this.state)
      .then(() => this.setState({email: '', password: ''}));
  }

  handleChange(e) {
    const { value, name } = e.target;

    this.setState({ [name]: value })
  }

  
  render() {
    const { isLogging, error } = this.props;
    return (
      <div className="login">
        <form onSubmit={this.handleSumbit}>
          {error && 
            <div className="alert alert-danger" role="alert">
              {error}
            </div>}
          <FormInput 
            type="text" 
            name='email' 
            value={this.state.email} 
            handleChange={this.handleChange}
            label='Email'
            required
          />

          <FormInput 
            type="password" 
            name='password' 
            value={this.state.password} 
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <CustomButton className="btn btn-primary">
            {
              isLogging 
              ? <div class="spinner-border text-white" role="status" />
              : "Sing in"
            }
            
          </CustomButton>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogging: state.auth.isLogging,
    error: state.auth.error
  }
}

export default connect(mapStateToProps, {
  login
})(Login);