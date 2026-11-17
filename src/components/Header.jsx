import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Header.css";

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
      <header className="gm-header-wrapper">
        {/* Barra Superior - Comando Estelar */}
        <div className="gm-top-bar">
          <div className="gm-top-container">
            <div className="gm-social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                title="📷"
              >
                📷
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                title="YouTube"
              >
                ▶
              </a>
            </div>
            <span>
              ⚡ Frete grátis para todo o Brasil em compras acima de R$ 250
            </span>
          </div>
        </div>

        {/* Linha Principal: Logo Dobrada, Busca e Ações com Espaçamento Ajustado */}
        <div className="gm-main-container">
          <Link
            to="/"
            onClick={() => setActiveCategory("TODOS")}
            className="gm-brand-link"
          >
            <img
              src="/logo-gamemania.png"
              alt="Game Mania Store - A Loja de Outro Mundo"
              className="gm-brand-img"
            />
          </Link>

          <div className="gm-search-wrapper">
            <input
              type="text"
              placeholder="Calibrando os lasers para sua busca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="gm-search-input"
            />
            <span className="gm-search-icon">🔍</span>
          </div>

          <div className="gm-actions-wrapper">
            <button onClick={() => setIsAuthOpen(true)} className="gm-auth-btn">
              ENTRE OU CADASTRE-SE
            </button>

            <Link to="/cart" className="gm-cart-btn">
              <div className="gm-cart-icon-box">🛒</div>
              <span className="gm-cart-label">PORÃO DE CARGA</span>
              {totalItems > 0 && (
                <span className="gm-cart-badge">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Menu de Categorias com Animação e Mega Menu Restaurados */}
        <div className="gm-nav-container">
          <div className="gm-nav-list">
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
                    className={`gm-cat-btn ${isActive ? "active" : ""}`}
                  >
                    {cat.name}
                  </button>

                  {cat.sub.length > 0 && isHovered && (
                    <div className="gm-submenu">
                      <div className="gm-submenu-title">
                        Subcategorias de Voo
                      </div>
                      {cat.sub.map((subItem) => (
                        <div
                          key={subItem}
                          onClick={() => {
                            setActiveCategory(cat.name);
                            setHoveredCategory(null);
                          }}
                          className="gm-submenu-item"
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
        <div className="gm-modal-overlay">
          <div className="gm-modal-card">
            <button
              onClick={() => setIsAuthOpen(false)}
              className="gm-modal-close"
            >
              ✕
            </button>

            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <h2 className="gm-modal-title">
                {authMode === "login" ? "ACESSAR CONTA" : "CRIAR CONTA ESTELAR"}
              </h2>
              <p className="gm-modal-subtitle">
                Entre para sincronizar seus dados com o Comando Estelar.
              </p>
            </div>

            <div className="gm-auth-tabs">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`gm-auth-tab ${authMode === "login" ? "active" : ""}`}
              >
                ENTRAR
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className={`gm-auth-tab ${authMode === "register" ? "active" : ""}`}
              >
                CADASTRAR
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="gm-auth-form">
              <div>
                <label className="gm-auth-label">E-MAIL</label>
                <input
                  type="email"
                  required
                  placeholder="patrulheiro@comando.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="gm-auth-input"
                />
              </div>

              <div>
                <label className="gm-auth-label">SENHA</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="gm-auth-input"
                />
              </div>

              <button type="submit" className="gm-auth-submit">
                {authMode === "login"
                  ? "INICIAR SESSÃO"
                  : "REGISTRAR TRIPULANTE"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
