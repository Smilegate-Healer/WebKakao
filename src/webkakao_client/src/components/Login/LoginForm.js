import React, { Component } from 'react';
import './LoginForm.css';
import axios from 'axios';

class LoginForm extends Component {
    state = {
        email: '',
        password: ''
    }

    signIn = (e) => {
        axios.post('/api/signin', {
          email: this.state.email,
          password: this.state.password
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    handleChange = (e) => {

        console.log(this.state)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

/*
    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);
        // 상태 초기화
        this.setState({
            email: '',
            password: ''
        })
    }
*/
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input
                        placeholder='이메일'
                        value={this.state.email}
                        onChange={this.handleChange}
                        name="email"
                    />

                </div>
                <div>
                    <input
                        placeholder="비밀번호"
                        value={this.state.password}
                        onChange={this.handleChange}
                        name="password"
                    />
                </div>
                <div>
                    <button type="submit" onClick={this.signIn} >로그인</button>
                </div>
                <div>
                    <button>회원가입</button>
                </div>

                <div>{this.state.email} {this.state.password}</div>
            </form>
        )
    }


}

export default LoginForm;