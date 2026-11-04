import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header-container">
      <div className="header-logo">
        <h2>🎮 Game Mania</h2>
      </div>

      <nav className="header-nav">
        <Link to="/" className="header-link">
          Início
        </Link>
        <Link to="/cart" className="header-link">
          🛒 Carrinho <span className="cart-badge">0</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
