import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Header({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
}) {
  const { totalItems } = useContext(CartContext);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const navCategories = [
    { name: "TODOS", sub: [] },
    {
      name: "Lançamentos",
      sub: ["Pré-Vendas", "Jogos do Mês", "Edições Colecionador"],
    },
    {
      name: "RetroGames",
      sub: ["PlayStation 1 & 2", "Super Nintendo", "Arcade Classics"],
    },
    {
      name: "PlayStation",
      sub: ["PS5 Consoles", "Jogos PS5", "Controles DualSense"],
    },
    { name: "Xbox", sub: ["Series X | S", "Game Pass", "Headsets Xbox"] },
    { name: "Nintendo", sub: ["Switch OLED", "Jogos Exclusivos", "Amiibos"] },
    {
      name: "Acessórios",
      sub: ["Teclados Mecânicos", "Headsets", "Funkos & Gear"],
    },
    {
      name: "Outlet",
      sub: ["Ofertas Relâmpago", "Jogos Usados", "Descontos 50%"],
    },
  ];

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    alert(`Autenticação simulada com sucesso para: ${email}`);
    setIsAuthOpen(false);
    setEmail("");
    setPassword("");
  };

  return (
    <>
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
        {/* Barra Superior com Ícones Oficiais de Redes Sociais (Padrão de Mercado) */}
        <div
          style={{
            backgroundColor: "#040507",
            borderBottom: "1px solid #10141c",
            fontSize: "0.72rem",
            color: "#8a99ad",
            padding: "6px 24px",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Ícones de Redes Sociais no Estilo Oficial Circular */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#10141c",
                  border: "1px solid #1e2633",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#cbd5e1",
                  fontSize: "0.7rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00e676";
                  e.currentTarget.style.color = "#00e676";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1e2633";
                  e.currentTarget.style.color = "#cbd5e1";
                }}
              >
                f
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#10141c",
                  border: "1px solid #1e2633",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#cbd5e1",
                  fontSize: "0.7rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00e676";
                  e.currentTarget.style.color = "#00e676";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1e2633";
                  e.currentTarget.style.color = "#cbd5e1";
                }}
              >
                📷
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                title="YouTube"
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#10141c",
                  border: "1px solid #1e2633",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#cbd5e1",
                  fontSize: "0.7rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00e676";
                  e.currentTarget.style.color = "#00e676";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1e2633";
                  e.currentTarget.style.color = "#cbd5e1";
                }}
              >
                ▶
              </a>
            </div>

            <span>
              ⚡ Frete grátis para todo o Brasil em compras acima de R$ 250
            </span>
          </div>
        </div>

        {/* Linha Principal: Logo, Busca e Ações */}
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

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => setIsAuthOpen(true)}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #00e676",
                color: "#00e676",
                padding: "9px 18px",
                borderRadius: "8px",
                fontSize: "0.75rem",
                fontWeight: "800",
                cursor: "pointer",
                letterSpacing: "0.5px",
                transition: "all 0.2s ease",
                boxShadow: "0 0 10px rgba(0,230,118,0.1)",
              }}
            >
              ENTRE OU CADASTRE-SE
            </button>

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

        {/* Menu de Categorias com Mega Menu Refinado */}
        <div
          style={{
            borderTop: "1px solid #131822",
            backgroundColor: "#05070a",
            position: "relative",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 24px",
              display: "flex",
              gap: "8px",
              overflowX: "visible",
            }}
          >
            {navCategories.map((cat) => {
              const isActive = activeCategory === cat.name;
              const isHovered = hoveredCategory === cat.name;

              return (
                <div
                  key={cat.name}
                  onMouseEnter={() => setHoveredCategory(cat.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  style={{ position: "relative" }}
                >
                  <button
                    onClick={() => setActiveCategory(cat.name)}
                    style={{
                      background: isActive
                        ? "rgba(0, 230, 118, 0.12)"
                        : "transparent",
                      border: "none",
                      borderBottom: isActive
                        ? "2px solid #00e676"
                        : "2px solid transparent",
                      color: isHovered || isActive ? "#00e676" : "#cbd5e1",
                      padding: "14px 18px",
                      fontSize: "0.78rem",
                      fontWeight: "800",
                      letterSpacing: "1px",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      transition: "all 0.25s ease",
                      whiteSpace: "nowrap",
                      textShadow: isHovered
                        ? "0 0 10px rgba(0,230,118,0.7)"
                        : "none",
                    }}
                  >
                    {cat.name}
                  </button>

                  {cat.sub.length > 0 && isHovered && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        backgroundColor: "rgba(10, 15, 24, 0.95)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(0, 230, 118, 0.4)",
                        boxShadow:
                          "0 15px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 230, 118, 0.15)",
                        borderRadius: "10px",
                        padding: "12px 0",
                        minWidth: "230px",
                        zIndex: 1100,
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <div
                        style={{
                          padding: "4px 18px 8px 18px",
                          fontSize: "0.65rem",
                          fontWeight: "900",
                          color: "#00e676",
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                          marginBottom: "4px",
                        }}
                      >
                        Subcategorias
                      </div>
                      {cat.sub.map((subItem) => (
                        <div
                          key={subItem}
                          onClick={() => {
                            setActiveCategory(cat.name);
                            setHoveredCategory(null);
                          }}
                          style={{
                            padding: "10px 18px",
                            color: "#94a3b8",
                            fontSize: "0.78rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#00e676";
                            e.currentTarget.style.color = "#07090e";
                            e.currentTarget.style.paddingLeft = "22px";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color = "#94a3b8";
                            e.currentTarget.style.paddingLeft = "18px";
                          }}
                        >
                          <span>{subItem}</span>
                          <span style={{ fontSize: "0.65rem", opacity: 0.7 }}>
                            ▶
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Modal de Autenticação */}
      {isAuthOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(5, 7, 10, 0.85)",
            backdropFilter: "blur(5px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#0b0f17",
              border: "2px solid #00e676",
              borderRadius: "16px",
              padding: "32px",
              width: "100%",
              maxWidth: "420px",
              boxShadow: "0 0 30px rgba(0, 230, 118, 0.3)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setIsAuthOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                backgroundColor: "transparent",
                border: "none",
                color: "#8a99ad",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  fontWeight: "900",
                  margin: "0 0 8px 0",
                }}
              >
                {authMode === "login" ? "ACESSAR CONTA" : "CRIAR CONTA ELITE"}
              </h2>
              <p style={{ color: "#8a99ad", fontSize: "0.8rem", margin: 0 }}>
                Entre para desbloquear benefícios exclusivos na Game Mania
                Store.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "20px",
                backgroundColor: "#10141c",
                padding: "4px",
                borderRadius: "8px",
              }}
            >
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                style={{
                  flex: 1,
                  padding: "8px",
                  backgroundColor:
                    authMode === "login" ? "#00e676" : "transparent",
                  color: authMode === "login" ? "#07090e" : "#8a99ad",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "800",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                ENTRAR
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                style={{
                  flex: 1,
                  padding: "8px",
                  backgroundColor:
                    authMode === "register" ? "#00e676" : "transparent",
                  color: authMode === "register" ? "#07090e" : "#8a99ad",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "800",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                CADASTRAR
              </button>
            </div>

            <form
              onSubmit={handleAuthSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#cbd5e1",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    marginBottom: "6px",
                  }}
                >
                  E-MAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    backgroundColor: "#10141c",
                    border: "1px solid #1e2633",
                    color: "#fff",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    color: "#cbd5e1",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    marginBottom: "6px",
                  }}
                >
                  SENHA
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    backgroundColor: "#10141c",
                    border: "1px solid #1e2633",
                    color: "#fff",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: "8px",
                  padding: "12px",
                  backgroundColor: "#00e676",
                  color: "#07090e",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "900",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  boxShadow: "0 0 15px rgba(0, 230, 118, 0.4)",
                  transition: "all 0.2s ease",
                }}
              >
                {authMode === "login"
                  ? "ENTRAR NA PLATAFORMA"
                  : "FINALIZAR CADASTRO"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
