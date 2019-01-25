import React from 'react';
import './LoginTemplate.css';

const LoginTemplate = ({ form, children }) => {
    return (
        <main className='login-template'>
            <div className='title'>
                로그인
            </div>
            <section className='form-wrapper'>
                {form}
            </section>
            <section className='login-wrapper'>
                {children}
            </section>
        </main>
    );
};

export default LoginTemplate;