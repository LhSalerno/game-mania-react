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
    "NEW RELEASES",
    "PC GAMER",
    "CONSOLES",
    "RETRO QUEST",
    "ACCESSORIES",
    "GEEK FEED",
  ];

  return (
    <header
      style={{
        backgroundColor: "#0a0c0f",
        borderBottom: "1px solid #1a1d24",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Topo: Logo, Busca e Carrinho */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setActiveCategory("TODOS")}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "2px solid #00e676",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00e676",
              fontSize: "1.1rem",
            }}
          >
            🎮
          </div>
          <div>
            <h1
              style={{
                fontSize: "1.1rem",
                color: "#fff",
                margin: 0,
                fontWeight: "900",
                letterSpacing: "1px",
                lineHeight: "1",
              }}
            >
              GAME
            </h1>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#00e676",
                fontWeight: "800",
                letterSpacing: "2px",
                display: "block",
              }}
            >
              MANIA
            </span>
          </div>
        </Link>

        {/* Campo de Pesquisa */}
        <div style={{ flex: 1, maxWidth: "500px", position: "relative" }}>
          <input
            type="text"
            placeholder="Search for Games, Gear, figures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 40px 10px 16px",
              borderRadius: "20px",
              backgroundColor: "#13161c",
              border: "1px solid #222733",
              color: "#fff",
              fontSize: "0.85rem",
              outline: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#00e676",
              fontSize: "0.85rem",
            }}
          >
            🔍
          </span>
        </div>

        {/* Ícone de Carrinho */}
        <Link
          to="/cart"
          style={{ textDecoration: "none", position: "relative" }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              backgroundColor: "#13161c",
              border: "1px solid #222733",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00e676",
              fontSize: "1rem",
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
                color: "#09090b",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                fontSize: "0.7rem",
                fontWeight: "900",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Menu das Categorias */}
      <div
        style={{ borderTop: "1px solid #13161c", backgroundColor: "#07080a" }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {navCategories.map((item) => {
            const isGeek = item === "GEEK FEED";
            const isActive = activeCategory === item;

            return (
              <button
                key={item}
                onClick={() => setActiveCategory(item)}
                style={{
                  background: isGeek
                    ? "rgba(0, 230, 118, 0.08)"
                    : "transparent",
                  border: isGeek ? "1px solid #00e676" : "none",
                  borderBottom:
                    isActive && !isGeek
                      ? "2px solid #00e676"
                      : "2px solid transparent",
                  color: isActive || isGeek ? "#00e676" : "#8a94a6",
                  padding: "12px 8px",
                  borderRadius: isGeek ? "20px" : "0",
                  fontSize: "0.75rem",
                  fontWeight: "800",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  margin: isGeek ? "4px 0" : "0",
                }}
              >
                {isGeek ? `⚙️ ${item}` : item}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;
