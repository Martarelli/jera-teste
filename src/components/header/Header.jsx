import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/header/header.css";

export default function Header() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    const name = sessionStorage.getItem("userName");
    console.log(email);
    console.log(name);
    if (name) {
      setUser(name);
    }
  }, [user]);

  return (
    <header>
      <div>
        <h2>{user}</h2>
      </div>
      <div className="links">
        <Link to="/">Dashboard</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </header>
  );
}
