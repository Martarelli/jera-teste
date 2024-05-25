import { useState } from "react";
import arrow from "../../assets/img/arrow.png";
import google from "../../assets/img/google.svg";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import "../../assets/styles/login/login.css";

const schema = object({
  email: string()
    .email("Informe um email válido.")
    .required("Email é um campo obrigatório."),
  password: string()
    .required("Password é um campo obrigatório.")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit() {
    try {
      if (!email || !password) {
        throw new Error("Email e Senha são OBRIGATÓRIOS!");
      }
      await signInWithEmailAndPassword(auth, email, password).then(
        (response) => {
          console.log(response);
          sessionStorage.setItem("accessToken", response.user.accessToken);
          sessionStorage.setItem("userEmail", response.user.email);
          sessionStorage.setItem("userName", email.split("@")[0].toUpperCase());
          navigate("/popular");
        }
      );
    } catch (error) {
      console.log(error.code);
      if (error.code == "auth/invalid-credential") {
        alert("Email ou Senha Incorretos...");
      }
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
        sessionStorage.setItem(
          "userName",
          response.user.displayName.split(" ")[0].toUpperCase()
        );
      });
      navigate("/popular");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="container__login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputContainer">
            <div className="inputContainer">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                {...register("email")}
                id="email"
                value={email}
                onInput={(event) => setEmail(event.target.value)}
                placeholder="Digite seu email..."
                autoComplete="off"
              />
            </div>
            <span className="error__message">{errors?.email?.message}</span>
          </div>

          <div className="inputContainer">
            <div className="inputContainer">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                {...register("password")}
                id="password"
                value={password}
                onInput={(event) => setPassword(event.target.value)}
                placeholder="Digite sua senha..."
              />
            </div>
            <span className="error__message">{errors?.password?.message}</span>
          </div>

          <button className="button" type="submit">
            Login com Email/Senha
            <img src={arrow} alt="arrow" />
          </button>

          <button
            className="button"
            id="google"
            type="button"
            onClick={handleGoogleLogin}
          >
            Login com
            <img src={google} alt="google" />
          </button>

          <div className="footer">
            <p>Não tem usuário?</p>
            <Link to="/register">Criar Usuário</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
