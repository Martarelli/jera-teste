import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import user from '../../assets/img/user-solid.svg';
import "../../assets/styles/register/register.css";

const schema = object({
  email: string()
    .email("Informe um email válido.")
    .required("Email é um campo obrigatório."),
  password: string()
    .required("Password é um campo obrigatório.")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export default function Register() {
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
      await createUserWithEmailAndPassword(auth, email, password).then(
        (response) => {
          console.log(response);
          alert("Usuário Criado com Sucesso...");
          navigate("/login");
        }
        );
      } catch (error) {
        if (error.code == 'auth/email-already-in-use') {
          alert("Esse Email já está em uso");
        }
    }
  }

  return (
    <div>
      <div className="container__register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputContainer">
            <div className="inputContainer">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                {...register("email")}
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite sua senha..."
              />
            </div>
            <span className="error__message">{errors?.password?.message}</span>
          </div>

          <button className="button" type="submit">
            <img src={user} alt="" />
            Cadastrar Usuário
          </button>

          <div className="footer">
            <p>Já possui usuário?</p>
            <Link to="/login">Fazer Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
