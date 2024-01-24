import { useEffect } from "react";
import axios from "axios";
import "./loginRegister.css";
import { useNavigate } from "react-router";
import Utils from "../utils/utils";

const Login = () => {
  const url = "http://localhost:3001/api";
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    isValidUser(email, password).then((status) => {
      console.log(status);
      if (status["data"]["exist"] != false) {
        Utils.SetCookie("isConnected", status["data"]["exist"]);
        Utils.SetCookie("userId", status["data"]["userId"]);
        Utils.SetCookie("nickname", status["data"]["nickName"]);
        navigate("/");
      } else {
        navigate("/login");
      }
    });
    e.target.reset();
  };

  async function isValidUser(email, password) {
    const result = await axios.post(url + "/accounts/isvalid", {
      email: email,
      password: password,
    });
    return result;
  }

  useEffect(() => {
    if (Utils.GetCookie("isConnected") == true) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div id="main-container-login-register">
      <div id="link-container">
        <a href="/register">Register ➜</a>
        <a href="/">Home ➜</a>
      </div>
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
