import React, { Component } from 'react';
import LoginTemplate from './LoginTemplate';
import LoginForm from './LoginForm';

class Login extends Component {
  handleCreate = (data) => {
    console.log(data);
  }
  render() {
    return (
      <LoginTemplate form = {(
        <LoginForm
            onCreate={this.handleCreate}
        />
      )}>

      </LoginTemplate>
    );
  }
}

export default Login;
