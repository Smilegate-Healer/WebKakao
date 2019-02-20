import React from "react";
import {
  Paper,
  Input,
  ButtonBase,
  InputBase,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import styles from "./styles.module.scss"
import { inject } from "mobx-react";
import classnames from "classnames";

@inject("stores")
class LoginPage extends React.Component {
  state = {
    email: "",
    password: ""
  };

  _handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state)
  };

  _onLoginClick = event => {
    const { email, password } = this.state;
    if (email !== "" && password !== "") {
      // TODO: email validation

      this.props.stores.user.signIn({
        email,
        password
      });
    }
  };

  _onSignupClick = event => {
    this.setState({
      modal: true
    });
  };

  _onResetPwdClick = event => {
    alert("reset password");
  };

  _handleModalClose = () => {
    this.setState({
      modal: false
    });
  };

  _onSignupApplyClick = event => {
    const { signupEmail, signupPassword, signupPasswordAgain, name }
      = this.state

    if(signupEmail === '' || signupPassword === ''
      || signupPasswordAgain === ''
      || name === '') alert("Fill the form")
    
    if(signupPassword !== signupPasswordAgain) {
      alert("Password is not same")
    }

    this.props.stores.user.signUp({
      email: signupEmail,
      password: signupPassword,
      name
    })
      .then(() => {
        alert("Success!")
        this._handleModalClose()
      })
      .catch(() => {
        alert("Fail!")
      })
  }

  _renderModal = () => {
    return (
      <Dialog
        open={this.state.modal}
        onClose={this._handleModalClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
        <DialogContent>
          <DialogContentText />
          {this._renderEmailInput("signupEmail")}
          {this._renderPasswordInput("signupPassword")}
          {this._renderPasswordInput("signupPasswordAgain", "Password again")}
          <InputBase
            fullWidth
            placeholder="Name"
            required
            className={styles.InputBase}
            classes={{
              input: styles.input
            }}
            type="text"
            name="name"
            onChange={this._handleChange}
          />
          <div>
            <Button
              className={classnames(
                styles.buttonBase, {
                  [styles.yellow]: true
                }
              )}
              fullWidth
              variant="outlined"
              onClick={this._onSignupApplyClick}
              style={{
                marginTop: "10px"
              }}>
              Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  _renderEmailInput = (name) => {
    return (
      <InputBase
        fullWidth
        placeholder="Email"
        required
        className={styles.InputBase}
        classes={{
          input: styles.input,
          error: styles.error
        }}
        type="Email"
        name={name}
        onChange={this._handleChange}
      />
    );
  };

  _renderPasswordInput = (name, holder) => {
    return (
      <InputBase
        fullWidth
        placeholder={holder ? holder : "Password"}
        required
        className={styles.InputBase}
        classes={{
          input: styles.input
        }}
        type="Password"
        name={name}
        onChange={this._handleChange}
      />
    );
  };

  _renderLoginButton = () => {
    return (
      <Button
        className={classnames(
          styles.buttonBase, {
            [styles.yellow]: true
          }
        )}
        fullWidth
        variant="outlined"
        onClick={this._onLoginClick}
      >
        Log In
      </Button>
    );
  };

  _renderSignupButton = () => {
    return (
      <Button
        fullWidth
        className={classnames(
          styles.buttonBase, {
            [styles.white]: true,
          }
        )}
        variant="outlined"
        onClick={this._onSignupClick}>
        Sign up
      </Button>
    );
  };

  render() {
    return (
      <div className={styles.LoginPageContainer}>
        <Paper className={styles.formContainer} elevation={1}>
          <div className={styles.titleContainer}>
            <Typography variant="h4">kakao</Typography>
          </div>

          <div className={styles.inputContainer}>
            {this._renderEmailInput("email")}
            {this._renderPasswordInput("password")}
          </div>

          <div className={styles.buttonContainer}>
            {this._renderLoginButton()}
          </div>

          <div className={styles.buttonContainer}>{this._renderSignupButton()}</div>

          <div className={styles.optionContainer}>
            <Typography
              variant="caption"
              onClick={this._onResetPwdClick}
              className={styles.reset}>
              Reset password
            </Typography>
          </div>
        </Paper>
        {this._renderModal()}
      </div>
    );
  }
}

export default LoginPage;
