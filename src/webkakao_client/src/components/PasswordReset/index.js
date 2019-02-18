import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

@inject("stores")
@observer
class PasswordReset extends Component {

    state = {
        email: '',
        name: ''
    }

    onLogin = () => {
        debugger;
        const { user } = this.props.stores;
        user.resetPassword(this.state);
    }

    emailChange = (e) => {
        this.setState({
            email: e.target.value,
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
                    <h2> Password Reset </h2>
                    <br></br>
                    <label> E-Mail </label>
                    <input type="email" id="inputEmail" value={this.state.email} placeholder="E-Mail" required onChange={this.emailChange} />
                    <label> name </label>
                    <input type="text" id="inputPassword" value={this.state.name} placeholder="Name" required onChange={this.nameChange} />
                    <br></br>
                </form>
                <button type="submit" onClick={this.onLogin}> Password Reset
                </button>
            </div>
        );
    }
}

export default PasswordReset;