import React from 'react';
import "./header.css"

const Header = () => {
    return (
        <div id="header">
            <section id="title-header">
                <div id="img-logo-home"></div>
                <h1>LABYRINTHE</h1>
            </section>
            <section id="link-login-register">
                <a href="/login">Login ➜</a>
                <a href="/register">Register ➜</a>
            </section>
        </div>
    );
};

export default Header;