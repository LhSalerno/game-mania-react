import { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider, CartContext } from "./context/CartContext";
import { products } from "./services/products";
import { formatCurrency } from "./utils/formatters";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import HeroCarousel from "./components/HeroCarousel";

// Componente da Página Principal (Home)
function Home({ searchTerm, activeCategory }) {
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
      {activeCategory === "TODOS" && !searchTerm && (
        <HeroCarousel onAddToCart={addToCart} />
      )}

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

// Componente da Página do Carrinho (CartPage) Consumindo o Contexto Unificado
function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotalPrice,
    discountAmount,
    shippingCost,
    totalPrice,
    cep,
    handleCepChange,
    addressData,
    cepLoading,
    couponCodeInput,
    setCouponCodeInput,
    appliedCoupon,
    couponMessage,
    applyCoupon,
    removeCoupon,
  } = useContext(CartContext);

  const [clientName, setClientName] = useState("");
  const [orderDispatched, setOrderDispatched] = useState(false);

  const handleFinalizeOrder = () => {
    if (!clientName.trim()) {
      alert(
        "Comandante, informe suas credenciais (Nome) para autorizar o envio.",
      );
      return;
    }

    if (!addressData) {
      alert(
        "Comandante, precisamos de um CEP válido para traçar as coordenadas da base.",
      );
      return;
    }

    setOrderDispatched(true);
    clearCart();
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 24px" }}>
      <h2
        style={{
          color: "#fff",
          fontSize: "1.8rem",
          fontWeight: "900",
          marginBottom: "32px",
          letterSpacing: "0.5px",
        }}
      >
        MEU CARRINHO DE COMPRAS
      </h2>

      {orderDispatched ? (
        <div
          style={{
            backgroundColor: "#121620",
            border: "1px solid #00e676",
            borderRadius: "16px",
            padding: "50px",
            textAlign: "center",
            boxShadow: "0 0 30px rgba(0, 230, 118, 0.15)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🛸🛰️</div>
          <h3
            style={{
              color: "#00e676",
              fontSize: "1.3rem",
              fontWeight: "900",
              marginBottom: "16px",
              letterSpacing: "0.5px",
            }}
          >
            TRANSMISSÃO CONCLUÍDA COM SUCESSO!
          </h3>
          <p
            style={{
              color: "#cbd5e1",
              fontSize: "0.95rem",
              lineHeight: "1.6",
              maxWidth: "650px",
              margin: "0 auto 24px auto",
            }}
          >
            Identidade confirmada, Comandante{" "}
            <strong>{clientName.toUpperCase()}</strong>. Seus equipamentos já
            estão sendo encapsulados no hangar principal para envio imediato.
            Fique atento aos canais de comunicação: as coordenadas de rastreio
            chegarão em breve à sua base.
          </p>
          <Link
            to="/"
            onClick={() => setOrderDispatched(false)}
            style={{
              backgroundColor: "#00e676",
              color: "#07090e",
              padding: "12px 28px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "900",
              fontSize: "0.85rem",
            }}
          >
            RETORNAR À VITRINE ESTELAR
          </Link>
        </div>
      ) : cart.length === 0 ? (
        <div
          style={{
            backgroundColor: "#121620",
            border: "1px solid #222d42",
            borderRadius: "16px",
            padding: "60px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
              fontSize: "1.05rem",
              marginBottom: "24px",
            }}
          >
            O seu carrinho está vazio no momento.
          </p>
          <Link
            to="/"
            style={{
              backgroundColor: "#00e676",
              color: "#07090e",
              padding: "12px 28px",
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Lado Esquerdo: Lista de Itens */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#121620",
                  border: "1px solid #222d42",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
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
                      margin: "0 0 4px 0",
                      fontSize: "0.95rem",
                      fontWeight: "800",
                    }}
                  >
                    {item.title}
                  </h4>
                  <span
                    style={{
                      color: "#00e676",
                      fontWeight: "900",
                      fontSize: "0.9rem",
                    }}
                  >
                    {formatCurrency(item.price)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "#090d14",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    border: "1px solid #1e293b",
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      background: "transparent",
                      color: "#fff",
                      border: "none",
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
                      fontSize: "0.85rem",
                      width: "16px",
                      textAlign: "center",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      background: "transparent",
                      color: "#fff",
                      border: "none",
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
                    fontSize: "0.78rem",
                  }}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          {/* Lado Direito: Painéis de Suprimentos, Frete, Cupons e Resumo */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* 1. Identificação */}
            <div
              style={{
                backgroundColor: "#121620",
                border: "1px solid #222d42",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <h4
                style={{
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "800",
                  margin: "0 0 8px 0",
                }}
              >
                🛸 COMANDO DE SUPRIMENTOS
              </h4>
              <input
                type="text"
                placeholder="Insira seu nome / credencial"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "#090d14",
                  border: "1px solid #1e293b",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#fff",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
              />
            </div>

            {/* 2. Frete / CEP com Autocompletar do Navegador */}
            <div
              style={{
                backgroundColor: "#121620",
                border: "1px solid #222d42",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <h4
                style={{
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "800",
                  margin: "0 0 8px 0",
                }}
              >
                ROTA INTERESTELAR (CEP)
              </h4>
              <input
                type="text"
                name="postal-code"
                autoComplete="postal-code"
                placeholder="00000-000"
                maxLength={9}
                value={cep}
                onChange={handleCepChange}
                style={{
                  width: "100%",
                  backgroundColor: "#090d14",
                  border: "1px solid #1e293b",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#fff",
                  fontSize: "0.85rem",
                  outline: "none",
                  letterSpacing: "1px",
                }}
              />
              {cepLoading && (
                <span
                  style={{
                    color: "#00e676",
                    fontSize: "0.78rem",
                    display: "block",
                    marginTop: "6px",
                  }}
                >
                  Calculando rota...
                </span>
              )}
              {addressData && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    backgroundColor: "rgba(0,230,118,0.05)",
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ color: "#00e676", fontSize: "0.78rem" }}>
                    {addressData.logradouro}, {addressData.bairro} -{" "}
                    {addressData.localidade}/{addressData.uf}
                  </span>
                </div>
              )}
            </div>

            {/* 3. Cupons */}
            <div
              style={{
                backgroundColor: "#121620",
                border: "1px solid #222d42",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <h4
                style={{
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "800",
                  margin: "0 0 10px 0",
                }}
              >
                CUPOM DE DESCONTO
              </h4>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  placeholder="EX: ZURG10"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                  style={{
                    flex: 1,
                    backgroundColor: "#090d14",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "#fff",
                    fontSize: "0.85rem",
                    outline: "none",
                    textTransform: "uppercase",
                  }}
                />
                <button
                  onClick={() => applyCoupon(couponCodeInput)}
                  style={{
                    backgroundColor: "#1e293b",
                    color: "#fff",
                    border: "none",
                    padding: "0 16px",
                    borderRadius: "8px",
                    fontWeight: "800",
                    cursor: "pointer",
                  }}
                >
                  APLICAR
                </button>
              </div>
              {couponMessage.text && (
                <span
                  style={{
                    display: "block",
                    marginTop: "8px",
                    color: couponMessage.isError ? "#ef4444" : "#00e676",
                    fontSize: "0.78rem",
                  }}
                >
                  {couponMessage.text}
                </span>
              )}
              {appliedCoupon && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", color: "#00e676" }}>
                    Ativo: <strong>{appliedCoupon.code}</strong>
                  </span>
                  <button
                    onClick={removeCoupon}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>

            {/* 4. Resumo */}
            <div
              style={{
                backgroundColor: "#121620",
                border: "1px solid #222d42",
                borderRadius: "12px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                }}
              >
                <span>Subtotal:</span>
                <span style={{ color: "#fff", fontWeight: "700" }}>
                  {formatCurrency(subtotalPrice)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#00e676",
                    fontSize: "0.85rem",
                  }}
                >
                  <span>Desconto:</span>
                  <span style={{ fontWeight: "700" }}>
                    - {formatCurrency(discountAmount)}
                  </span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                }}
              >
                <span>Frete:</span>
                <span style={{ color: "#fff", fontWeight: "700" }}>
                  {addressData
                    ? shippingCost === 0
                      ? "GRÁTIS"
                      : formatCurrency(shippingCost)
                    : "Informe o CEP"}
                </span>
              </div>

              <div
                style={{
                  borderTop: "1px solid #1e293b",
                  paddingTop: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontSize: "0.95rem",
                    fontWeight: "800",
                  }}
                >
                  Total Geral:
                </span>
                <span
                  style={{
                    color: "#00e676",
                    fontSize: "1.4rem",
                    fontWeight: "900",
                  }}
                >
                  {formatCurrency(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleFinalizeOrder}
                style={{
                  backgroundColor: "#00e676",
                  color: "#07090e",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "900",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  marginTop: "8px",
                }}
              >
                FINALIZAR COMPRA
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
