import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        display: "flex",
        justify: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#1a1a1a",
        color: "#fff",
      }}
    >
      <div className="logo">
        <h2>🎮 Game Mania</h2>
      </div>

      <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link
          to="/"
          style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
        >
          Início
        </Link>
        <Link
          to="/cart"
          style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
        >
          🛒 Carrinho (0)
        </Link>
      </nav>
    </header>
  );
}

export default Header;
