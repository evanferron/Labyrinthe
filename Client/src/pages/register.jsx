import { useState, useEffect } from "react";
import axios from "axios";
import Utils from "../utils/utils";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const url = "http://localhost:3001/api";
  const [insertError, setInsertError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nickname = e.target.nickname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    postNewAccount({
      nickname: nickname,
      email: email,
      password: password,
    })
      .then((status) => {
        isValidUser(email, password, status);
      })
      .catch((e) => {
        setInsertError(true);
        console.log(e);
      });
  };

  async function isValidUser(email, password, status) {
    const user = await axios.post(url + "/accounts/isvalid", {
      email: email,
      password: password,
    });
    if (status[Object.keys(status)] != false) {
      Utils.SetCookie("isConnected", status[Object.keys(status)], 30);
      Utils.SetCookie("userId", user["data"]["userId"]);
      Utils.SetCookie("userId", user["data"]["nickName"]);
      navigate("/");
    } else {
      navigate("/register");
    }
  }
  const postNewAccount = async (dataAccount) => {
    const data = await axios.post(url + "/accounts/add", dataAccount);
    return data.data;
  };
  useEffect(() => {
    if (Utils.GetCookie("isConnected") == true) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div id="main-container-login-register">
      <div id="link-container">
        <a href="/login">Login ➜</a>
        <a href="/">Home ➜</a>
      </div>
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
      {insertError ? (
        <span>
          Insetion error (probably an user that is already register with somes
          of your ids)
        </span>
      ) : null}
    </div>
  );
};

export default Register;
