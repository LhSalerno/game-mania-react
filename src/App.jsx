import { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider, CartContext } from "./context/CartContext";
import { products } from "./services/products";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

// Componente da Página Principal (Catálogo)
function Home({ searchTerm, activeCategory, setActiveCategory }) {
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "TODOS" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 24px" }}>
      {/* Banner / Hero Section de Elite */}
      <div
        style={{
          background: "linear-gradient(135deg, #101826 0%, #0b0f17 100%)",
          border: "1px solid #1e293b",
          borderRadius: "16px",
          padding: "40px",
          marginBottom: "40px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
          <span
            style={{
              color: "#00e676",
              fontSize: "0.75rem",
              fontWeight: "900",
              letterSpacing: "3px",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
            }}
          >
            ⚡ Temporada de Ofertas Elite
          </span>
          <h2
            style={{
              color: "#fff",
              fontSize: "2.2rem",
              fontWeight: "900",
              margin: "0 0 12px 0",
              lineHeight: "1.2",
            }}
          >
            DOMINE O JOGO COM PREÇOS ABSOLUTOS
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.95rem",
              margin: "0 0 24px 0",
              lineHeight: "1.5",
            }}
          >
            Explore lançamentos exclusivos, consoles de nova geração e
            equipamentos de alto desempenho para o seu setup gamer.
          </p>
          <button
            onClick={() => setActiveCategory("Lançamentos")}
            style={{
              backgroundColor: "#00e676",
              color: "#07090e",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "900",
              fontSize: "0.85rem",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(0, 230, 118, 0.4)",
              transition: "all 0.2s ease",
            }}
          >
            VER LANÇAMENTOS
          </button>
        </div>
      </div>

      {/* Cabeçalho da Listagem */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h3
          style={{
            color: "#fff",
            fontSize: "1.25rem",
            fontWeight: "800",
            margin: 0,
            letterSpacing: "0.5px",
          }}
        >
          {activeCategory === "TODOS"
            ? "DESTAQUES DA VITRINE"
            : `CATEGORIA: ${activeCategory.toUpperCase()}`}
        </h3>
        <span
          style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: "700" }}
        >
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "item encontrado"
            : "itens encontrados"}
        </span>
      </div>

      {/* Grelha de Produtos */}
      {filteredProducts.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}
        >
          <p style={{ fontSize: "1.1rem", fontWeight: "700" }}>
            Nenhum produto encontrado para a sua busca.
          </p>
        </div>
      )}
    </div>
  );
}

// Componente da Página do Carrinho
function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useContext(CartContext);

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 24px" }}>
      <h2
        style={{
          color: "#fff",
          fontSize: "1.8rem",
          fontWeight: "900",
          marginBottom: "24px",
        }}
      >
        MEU CARRINHO DE COMPRAS
      </h2>

      {cart.length === 0 ? (
        <div
          style={{
            backgroundColor: "#121620",
            border: "1px solid #222d42",
            borderRadius: "12px",
            padding: "48px",
            textAlign: "center",
          }}
        >
          <p
            style={{ color: "#94a3b8", fontSize: "1rem", marginBottom: "20px" }}
          >
            O seu carrinho está vazio no momento.
          </p>
          <Link
            to="/"
            style={{
              backgroundColor: "#00e676",
              color: "#07090e",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "900",
              fontSize: "0.85rem",
            }}
          >
            VOLTAR À LOJA
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#121620",
                border: "1px solid #222d42",
                borderRadius: "12px",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    color: "#fff",
                    margin: "0 0 6px 0",
                    fontSize: "1rem",
                    fontWeight: "800",
                  }}
                >
                  {item.title}
                </h4>
                <span
                  style={{
                    color: "#00e676",
                    fontWeight: "900",
                    fontSize: "0.95rem",
                  }}
                >
                  R$ {item.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    background: "#1e293b",
                    color: "#fff",
                    border: "none",
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "900",
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    color: "#fff",
                    fontWeight: "800",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    background: "#1e293b",
                    color: "#fff",
                    border: "none",
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "900",
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontWeight: "800",
                  fontSize: "0.8rem",
                }}
              >
                Remover
              </button>
            </div>
          ))}

          <div
            style={{
              backgroundColor: "#121620",
              border: "1px solid #222d42",
              borderRadius: "12px",
              padding: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <div>
              <span
                style={{
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  display: "block",
                }}
              >
                Total do Pedido:
              </span>
              <span
                style={{
                  color: "#00e676",
                  fontSize: "1.5rem",
                  fontWeight: "900",
                }}
              >
                R$ {totalPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={clearCart}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #ef4444",
                  color: "#ef4444",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontWeight: "800",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                Esvaziar
              </button>
              <button
                onClick={() =>
                  alert("Checkout simulado com sucesso! Obrigado pela compra.")
                }
                style={{
                  backgroundColor: "#00e676",
                  color: "#07090e",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontWeight: "900",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// App Principal com Router
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("TODOS");

  return (
    <CartProvider>
      <Router>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#090d14",
          }}
        >
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    searchTerm={searchTerm}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                  />
                }
              />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}
