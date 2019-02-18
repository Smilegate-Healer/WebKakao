import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

@inject("stores")
@observer

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    onLogin = () => {
        debugger;
        const { user } = this.props.stores;
        user.signIn(this.state);
    }

    emailChange = (e) => {
        this.setState({
            email: e.target.value,
        });
    }

    passwdChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <div>
                <form>
                    <h2> Please sign in </h2>
                    <br></br>
                    <label> E-Mail </label>
                    <input type="email" id="inputEmail" value={this.state.email} placeholder="E-Mail" required onChange={this.emailChange} />
                    <label htmlFor="inputPassword" > Password </label>
                    <input type="password" id="inputPassword" value={this.state.password} placeholder="Password" required onChange={this.passwdChange} />
                    <br></br>
                </form>
                <button type="submit" onClick={this.onLogin}> Sign in
                </button>
                <br></br>
                <button> Sign up
                </button>
                <br></br>
                <span>Forgot password?</span>
            </div>
        );
    }
}

export default SignIn;