import React from 'react';

const Register = () => {

    
    const handleSubmit = (e) =>{
        e.preventDefault()

        const nickname = e.target.nickname.value
        const email = e.target.email.value
        const password = e.target.password.value

        event.target.reset()
    }
    
    return (
        <div id="main-container-login-register">
            <a href="/login">Login ➜</a>
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <label>
                Nickname
                <input type="text" name="nickname" className="input-login" />
            </label>
            <label>
                Email
                <input type="text" name="email" className="input-login" />
            </label>
            <label>
                Password
                <input type="password" name="password" className="input-login" />
            </label>
            <button>Register</button>
        </form>

    </div>
    );
};

export default Register;