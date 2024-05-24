import { useEffect} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  async function logout() {
    try {
      await signOut(auth).then(() => {
        alert("Logout Efetuado com Sucesso...")
        sessionStorage.clear();
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    logout();
  });

  return ;
}
