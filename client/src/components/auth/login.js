import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class Login extends Component {
  render() {
    return (
      <form>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" />
        </fieldset>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(Login);