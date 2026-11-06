import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Header() {
  const { totalItems } = useContext(CartContext);

  return (
    <header
      style={{
        backgroundColor: "#121214",
        borderBottom: "1px solid #202024",
        padding: "20px 0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 12px rgba(0, 230, 118, 0.05)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logotipo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>🎮</span>
          <h1
            style={{
              fontSize: "1.3rem",
              color: "#fff",
              margin: 0,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontWeight: "900",
            }}
          >
            Game{" "}
            <span
              style={{
                color: "#00e676",
                textShadow: "0 0 10px rgba(0,230,118,0.4)",
              }}
            >
              Mania
            </span>
          </h1>
        </Link>

        {/* Links de Navegação */}
        <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            to="/"
            style={{
              color: "#c4c4cc",
              textDecoration: "none",
              fontWeight: "500",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.color = "#00e676")}
            onMouseOut={(e) => (e.target.style.color = "#c4c4cc")}
          >
            Início
          </Link>

          <Link
            to="/cart"
            style={{
              backgroundColor: "#202024",
              border: "1px solid #323238",
              padding: "8px 16px",
              borderRadius: "8px",
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "bold",
              transition: "all 0.2s",
            }}
          >
            <span>🛒 Carrinho</span>
            {totalItems > 0 && (
              <span
                style={{
                  backgroundColor: "#00e676",
                  color: "#121214",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "0.75rem",
                  fontWeight: "900",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
