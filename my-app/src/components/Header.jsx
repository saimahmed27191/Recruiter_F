import { Link } from "react-router-dom";
import logo from "../assets/Recuiter.svg"; 
import "../styles/Header.css"

function Header() {
  return (
    <header>
      <Link to="/" className="logo-img">
        <img src={logo} alt="Logo" />
      </Link>
    </header>
  );
}

export default Header;
