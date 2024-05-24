import { useState } from "react";
import logo from "../../assets/img/logo.png";
import arrow from "../../assets/img/arrow.png";
import google from "../../assets/img/google.svg";
import "../../assets/styles/login/login.css";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

// import { db } from './firebase';
// import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!email || !password) {
        throw new Error("Email e Senha são OBRIGATÓRIOS!");
      }
      await signInWithEmailAndPassword(auth, email, password).then(
        (response) => {
          console.log(response);
          sessionStorage.setItem("accessToken", response.user.accessToken);
          navigate("/dashboard");
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then((response) => {
        console.log(response);
        sessionStorage.setItem("accessToken", response.user.accessToken);
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="container">
        <header className="header">
          <img src={logo} alt="logo" />
          <span>Faça seu Login :)</span>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Digite seu email..."
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Digite seu Password..."
            />
          </div>

          <button
            className="button"
            id="google"
            type="button"
            onClick={handleGoogleLogin}
          >
            Login With
            <img src={google} alt="google" />
          </button>

          <button className="button">
            Login With Email/Password
            <img src={arrow} alt="arrow" />
          </button>

          <div className="footer">
            <p>Não tem usuário?</p>
            <a href="">Criar Usuário</a>
          </div>
        </form>
      </div>
    </div>
  );
}
