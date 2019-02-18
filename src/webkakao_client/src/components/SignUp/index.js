import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

@inject("stores")
@observer

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        name: ''
    }

    onLogin = () => {
        debugger;
        const { user } = this.props.stores;
        user.signUp(this.state);
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

    nameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    render() {
        return (
            <div>
                <form>
                    <h2> Please sign up </h2>
                    <br></br>
                    <label> E-Mail </label>
                    <input type="email" id="inputEmail" value={this.state.email} placeholder="E-Mail" required onChange={this.emailChange} />
                    <label> Password </label>
                    <input type="password" id="inputPassword" value={this.state.password} placeholder="Password" required onChange={this.passwdChange} />
                    <label> name </label>
                    <input type="text" id="inputPassword" value={this.state.name} placeholder="Name" required onChange={this.nameChange} />
                    <br></br>
                </form>
                <button type="submit" onClick={this.onLogin}> Sign up
                </button>
            </div>
        );
    }
}

export default SignIn;