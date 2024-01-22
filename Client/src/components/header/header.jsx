import React,{useState,useEffect} from 'react';
import "./header.css"
import Utils from "../../utils/utils.jsx"

const Header = () => {
    const [isConnected,setIsConnected] = useState(Utils.GetCookie("isConnected"));
    const titre = "test"
    const LogOut = () => {
        Utils.SetCookie("isConnected",false,30)
        Utils.SetCookie("userId","",30)
        Utils.SetCookie("nickname","",30)
        setIsConnected(false)
    }
    useEffect(()=>{
        setIsConnected(Utils.GetCookie("isConnected"))
    },[])
    return (
        <div id="header">
            <section id="title-header">
                <div id="img-logo-home"></div>
                <h1>LABYRINTHE</h1>
            </section>
            {
            isConnected?
                    <section>
                        <span>Hello</span>
                        <button onClick={LogOut}>logout</button>
                    </section>:
                    <section id="link-login-register">
                        <a href="/login">Login ➜</a>
                        <a href="/register">Register ➜</a>
                    </section>
            }
        </div>
    );
};

export default Header;