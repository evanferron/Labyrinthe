import React from 'react';
import "./loginRegister.css"


const Login = () => {

    const handleSubmit = (e) =>{
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value


        event.target.reset()
    }

    return (
        <div id="main-container-login-register">
            <a href="/register">Register ➜</a>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label>
                    Email
                    <input type="text" name="email" className="input-login" />
                </label>
                <label>
                    Password
                    <input type="password" name="password" className="input-login" />
                </label>
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;