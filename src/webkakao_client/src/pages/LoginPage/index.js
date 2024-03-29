import React from "react";
import {
  Paper,
  InputBase,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import styles from "./styles.module.scss"
import { inject, observer } from "mobx-react";
import classnames from "classnames";

@inject("stores")
@observer
class LoginPage extends React.Component {
  state = {
    email: "",
    password: "",
    isPasswordReset: false,
    modal: false
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
      })
        .then((success) => {
          if (success === false) {
            alert("이메일과 비밀번호를 확인해주세요.")
          }
        })
        .catch(() => {
          alert("서버와 연결할 수 없습니다. 잠시후 다시 요청해주세요.")
        });
    }
  };

  _onSignupClick = event => {
    this.setState({
      isPasswordReset: false,
      modal: true
    });
  };

  _onResetPwdClick = event => {
    this.setState({
      isPasswordReset: true,
      modal: true
    })
  };

  _handleModalClose = () => {
    this.setState({
      modal: false
    });
  };

  _onSignupApplyClick = event => {
    const { signupEmail, signupPassword, signupPasswordAgain, name }
      = this.state

    if (signupEmail === '' || signupPassword === ''
      || signupPasswordAgain === ''
      || name === '') alert("모든 입력칸을 채워주세요.")

    if (signupPassword !== signupPasswordAgain) {
      alert("비밀번호를 확인해주세요.")
    }

    this.props.stores.user.signUp({
      email: signupEmail,
      password: signupPassword,
      name
    })
      .then(() => {
        alert("회원가입에 성공하였습니다.")
        this._handleModalClose()
      })
      .catch(() => {
        alert("실패하였습니다.")
      })
  }

  _renderSingupContent = () => {
    return (
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
    )
  }

  _renderResetPasswordContent = () => {
    return (
      <DialogContent>
        <DialogContentText />
        {this._renderEmailInput("resetEmail")}
        <InputBase
          fullWidth
          placeholder="Name"
          required
          className={styles.InputBase}
          classes={{
            input: styles.input
          }}
          type="text"
          name="resetName"
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
            onClick={this._onResetPasswordClick}
            style={{
              marginTop: "10px"
            }}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    )
  }

  _onResetPasswordClick = event => {
    const { resetEmail, resetName } = this.state;
    if (resetEmail !== "" && resetName !== "") {
      const data = {
        email: resetEmail,
        name: resetName
      }
      this.props.stores.user.resetPassword(data)
        .then(() => {
          alert("비밀번호가 초기화되었습니다. 이메일로 전송된 임시 비밀번호로 로그인 후 비밀번호를 변경하세요.");
          this._handleModalClose()
        }).catch(() => {
          alert("회원 정보를 확인 후 다시 시도해주세요.")
        });
    }
  }


  _renderModal = () => {

    return (
      <Dialog
        open={this.state.modal}
        onClose={this._handleModalClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {
            this.state.isPasswordReset
              ? "Reset password"
              : "Sign up"
          }
        </DialogTitle>
        {
          this.state.isPasswordReset
            ? this._renderResetPasswordContent()
            : this._renderSingupContent()
        }
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
