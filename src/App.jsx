import { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider, CartContext } from "./context/CartContext";
import { products } from "./services/products";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import HeroCarousel from "./components/HeroCarousel";

// Componente da Página Principal (Catálogo com Carrossel e Vitrine Estratégica)
function Home({ searchTerm, activeCategory, setActiveCategory }) {
  const { addToCart } = useContext(CartContext);

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
      {/* Carrossel de Destaques (Exibido apenas na aba TODOS ou quando não há busca ativa) */}
      {activeCategory === "TODOS" && !searchTerm && (
        <HeroCarousel onAddToCart={addToCart} />
      )}

      {/* Cabeçalho da Listagem / Vitrine */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h3
            style={{
              color: "#fff",
              fontSize: "1.25rem",
              fontWeight: "800",
              margin: "0 0 4px 0",
              letterSpacing: "0.5px",
            }}
          >
            {activeCategory === "TODOS"
              ? "VITRINE DE ELITE • TODOS OS PRODUTOS"
              : `CATEGORIA: ${activeCategory.toUpperCase()}`}
          </h3>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.78rem",
              margin: 0,
              fontWeight: "700",
            }}
          >
            Explorando equipamentos e jogos com certificação de autenticidade
          </p>
        </div>
        <span
          style={{
            color: "#00e676",
            fontSize: "0.85rem",
            fontWeight: "800",
            backgroundColor: "rgba(0,230,118,0.08)",
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid rgba(0,230,118,0.2)",
          }}
        >
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "item disponível"
            : "itens disponíveis"}
        </span>
      </div>

      {/* Grelha de Produtos com Alta Conversão */}
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
          style={{
            backgroundColor: "#121620",
            border: "1px solid #222d42",
            borderRadius: "12px",
            padding: "60px",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: "800",
              color: "#fff",
              marginBottom: "8px",
            }}
          >
            Nenhum item encontrado
          </p>
          <p style={{ fontSize: "0.85rem", margin: 0 }}>
            Tente pesquisar por outro termo ou selecione a categoria "TODOS".
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
