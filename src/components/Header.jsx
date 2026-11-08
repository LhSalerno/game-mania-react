import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Header({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
}) {
  const { totalItems } = useContext(CartContext);

  const navCategories = [
    "TODOS",
    "Lançamentos",
    "RetroGames",
    "PlayStation",
    "Xbox",
    "Nintendo",
    "Acessórios",
    "Outlet",
  ];

  return (
    <header
      style={{
        backgroundColor: "#07090e",
        borderBottom: "2px solid #00e676",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 20px rgba(0, 230, 118, 0.15)",
      }}
    >
      {/* Linha Superior: Logo de Alto Impacto, Busca e Ações */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {/* Logo Imponente */}
        <Link
          to="/"
          onClick={() => setActiveCategory("TODOS")}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              background: "linear-gradient(135deg, #00e676 0%, #00b359 100%)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#07090e",
              fontSize: "1.3rem",
              fontWeight: "900",
              boxShadow: "0 0 15px rgba(0,230,118,0.5)",
            }}
          >
            🎮
          </div>
          <div>
            <h1
              style={{
                fontSize: "1.25rem",
                color: "#fff",
                margin: 0,
                fontWeight: "900",
                letterSpacing: "1.5px",
                lineHeight: "1",
              }}
            >
              GAME MANIA
            </h1>
            <span
              style={{
                fontSize: "0.65rem",
                color: "#00e676",
                fontWeight: "800",
                letterSpacing: "3px",
                display: "block",
                textTransform: "uppercase",
              }}
            >
              Store Elite Edition
            </span>
          </div>
        </Link>

        {/* Campo de Pesquisa Avançado */}
        <div style={{ flex: 1, maxWidth: "500px", position: "relative" }}>
          <input
            type="text"
            placeholder="Pesquisar jogos, consoles, equipamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 40px 11px 18px",
              borderRadius: "24px",
              backgroundColor: "#10141c",
              border: "1px solid #1e2633",
              color: "#fff",
              fontSize: "0.85rem",
              outline: "none",
              transition: "all 0.3s ease",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#00e676",
              fontSize: "0.9rem",
            }}
          >
            🔍
          </span>
        </div>

        {/* Ações: Autenticação + Carrinho */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Botão Entre ou Cadastre-se */}
          <button
            onClick={() =>
              alert("Módulo de Autenticação / Login em desenvolvimento!")
            }
            style={{
              backgroundColor: "transparent",
              border: "1px solid #00e676",
              color: "#00e676",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: "800",
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "all 0.2s ease",
            }}
          >
            ENTRE OU CADASTRE-SE
          </button>

          {/* Carrinho */}
          <Link
            to="/cart"
            style={{ textDecoration: "none", position: "relative" }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#10141c",
                border: "1px solid #1e2633",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00e676",
                fontSize: "1.1rem",
                boxShadow: "0 0 10px rgba(0,230,118,0.1)",
              }}
            >
              🛒
            </div>
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  backgroundColor: "#00e676",
                  color: "#07090e",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "0.75rem",
                  fontWeight: "900",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 8px #00e676",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Menu de Categorias com Identidade Visual Robusta */}
      <div
        style={{ borderTop: "1px solid #131822", backgroundColor: "#05070a" }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            gap: "8px",
            overflowX: "auto",
          }}
        >
          {navCategories.map((item) => {
            const isActive = activeCategory === item;

            return (
              <button
                key={item}
                onClick={() => setActiveCategory(item)}
                style={{
                  background: isActive
                    ? "rgba(0, 230, 118, 0.12)"
                    : "transparent",
                  border: "none",
                  borderBottom: isActive
                    ? "2px solid #00e676"
                    : "2px solid transparent",
                  color: isActive ? "#00e676" : "#a0aec0",
                  padding: "14px 16px",
                  fontSize: "0.78rem",
                  fontWeight: "800",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;
