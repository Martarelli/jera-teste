import { useState } from "react";
import arrow from "../../assets/img/arrow.png";
import google from "../../assets/img/google.svg";
import "../../assets/styles/login/login.css";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
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
          sessionStorage.setItem("userEmail", response.user.email);
          sessionStorage.setItem("userName", email.split('@')[0].toUpperCase());
          navigate("/popular");
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
        sessionStorage.setItem("userEmail", response.user.email);
        sessionStorage.setItem("userName", response.user.displayName.split(' ')[0].toUpperCase());
      });
      navigate("/popular");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="container__login">
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
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Digite sua senha..."
            />
          </div>

          <button
            className="button"
            id="google"
            type="button"
            onClick={handleGoogleLogin}
          >
            Login com
            <img src={google} alt="google" />
          </button>

          <button className="button">
            Login com Email/Senha
            <img src={arrow} alt="arrow" />
          </button>

          <div className="footer">
            <p>Não tem usuário?</p>
            <Link to='/register'>Criar Usuário</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
