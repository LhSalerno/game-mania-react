import { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider, CartContext } from "./context/CartContext";
import { products } from "./services/products";
import { formatCurrency } from "./utils/formatters";
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

// Componente da Página do Carrinho com Identidade "Entrega de Outro Mundo 🛸" e ViaCEP
function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useContext(CartContext);

  const [cep, setCep] = useState("");
  const [addressData, setAddressData] = useState(null);
  const [cepLoading, setCepLoading] = useState(false);
  const [shippingValue, setShippingValue] = useState(null);

  const [couponInput, setCouponInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null);

  const handleCepChange = async (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);

    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
    setCep(value);

    const cleanCep = value.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setCepLoading(true);
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCep}/json/`,
        );
        const data = await response.json();

        if (!data.erro) {
          setAddressData(data);
          setShippingValue(28.5);
        } else {
          setAddressData(null);
          setShippingValue(null);
          alert("CEP não encontrado na base nacional.");
        }
      } catch (error) {
        console.error("Erro ao consultar CEP:", error);
      } finally {
        setCepLoading(false);
      }
    } else {
      setAddressData(null);
      setShippingValue(null);
    }
  };

  const handleApplyCoupon = () => {
    if (couponInput.trim().toUpperCase() === "ELITE10") {
      setDiscount(0.1);
      setCouponMessage({
        text: "Cupom ELITE10 aplicado com sucesso! (10% OFF)",
        error: false,
      });
    } else {
      setDiscount(0);
      setCouponMessage({
        text: "Cupom inválido ou expirado. (Experimente: ELITE10)",
        error: true,
      });
    }
  };

  const shippingCost = shippingValue !== null ? shippingValue : 0;
  const discountAmount = totalPrice * discount;
  const finalOrderTotal = totalPrice - discountAmount + shippingCost;

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

      {cart.length === 0 ? (
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
                      fontSize: "0.9rem",
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
                      fontSize: "0.9rem",
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

          {/* Lado Direito: Sumário, Frete "Entrega de Outro Mundo" e Cupons */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Bloco de Frete com Identidade "Entrega de Outro Mundo 🛸" */}
            <div
              style={{
                backgroundColor: "#121620",
                border: "1px solid #222d42",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>🛸</span>
                <div>
                  <h4
                    style={{
                      color: "#fff",
                      fontSize: "0.9rem",
                      fontWeight: "800",
                      margin: 0,
                    }}
                  >
                    ENTREGA DE OUTRO MUNDO
                  </h4>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "0.72rem",
                      margin: "2px 0 0 0",
                      fontWeight: "700",
                    }}
                  >
                    Velocidade interestelar direto para a sua base.
                  </p>
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "8px", position: "relative" }}
              >
                <input
                  type="text"
                  name="postal-code"
                  autoComplete="postal-code"
                  placeholder="00000-000"
                  maxLength={9}
                  value={cep}
                  onChange={handleCepChange}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#00e676";
                    e.currentTarget.style.boxShadow =
                      "0 0 15px rgba(0, 230, 118, 0.3)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#1e293b";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#090d14",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "#fff",
                    fontSize: "0.85rem",
                    outline: "none",
                    letterSpacing: "1px",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>

              {cepLoading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(0,230,118,0.2)",
                      borderTop: "2px solid #00e676",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <span
                    style={{
                      color: "#00e676",
                      fontSize: "0.78rem",
                      fontWeight: "800",
                      letterSpacing: "0.5px",
                    }}
                  >
                    CONECTANDO COM A NAVE MÃE...
                  </span>
                </div>
              )}

              {addressData && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "12px",
                    backgroundColor: "rgba(0,230,118,0.05)",
                    borderRadius: "8px",
                    border: "1px solid rgba(0,230,118,0.3)",
                    boxShadow: "0 0 15px rgba(0,230,118,0.1)",
                    animation: "fadeIn 0.4s ease-in-out",
                  }}
                >
                  <span
                    style={{
                      color: "#00e676",
                      fontSize: "0.8rem",
                      fontWeight: "900",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    📍 BASE DE DESTINO VALIDADA:
                  </span>
                  <p
                    style={{
                      color: "#cbd5e1",
                      fontSize: "0.78rem",
                      margin: "0 0 8px 0",
                      lineHeight: "1.4",
                    }}
                  >
                    {addressData.logradouro}, {addressData.bairro} -{" "}
                    {addressData.localidade}/{addressData.uf}
                  </p>
                  <div
                    style={{
                      borderTop: "1px solid rgba(0,230,118,0.15)",
                      paddingTop: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                      Frete Expresso (3 dias úteis):
                    </span>
                    <span
                      style={{
                        color: "#00e676",
                        fontSize: "0.85rem",
                        fontWeight: "900",
                      }}
                    >
                      {formatCurrency(shippingValue)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bloco de Cupom de Desconto */}
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
                  margin: "0 0 12px 0",
                }}
              >
                CUPOM DE DESCONTO
              </h4>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  placeholder="Ex: ELITE10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
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
                  onClick={handleApplyCoupon}
                  style={{
                    backgroundColor: "#1e293b",
                    color: "#fff",
                    border: "none",
                    padding: "0 16px",
                    borderRadius: "8px",
                    fontWeight: "800",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  APLICAR
                </button>
              </div>
              {couponMessage && (
                <span
                  style={{
                    display: "block",
                    marginTop: "8px",
                    color: couponMessage.error ? "#ef4444" : "#00e676",
                    fontSize: "0.78rem",
                    fontWeight: "700",
                  }}
                >
                  {couponMessage.text}
                </span>
              )}
            </div>

            {/* Sumário de Valores */}
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
                  {formatCurrency(totalPrice)}
                </span>
              </div>

              {discount > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#00e676",
                    fontSize: "0.85rem",
                  }}
                >
                  <span>Desconto ({discount * 100}%):</span>
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
                  {shippingValue !== null
                    ? formatCurrency(shippingValue)
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
                  {formatCurrency(finalOrderTotal)}
                </span>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  onClick={clearCart}
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: "800",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    flex: 1,
                  }}
                >
                  Esvaziar
                </button>
                <button
                  onClick={() =>
                    alert(
                      "Checkout simulado com sucesso! Obrigado pela compra.",
                    )
                  }
                  style={{
                    backgroundColor: "#00e676",
                    color: "#07090e",
                    border: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    fontWeight: "900",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    flex: 1.5,
                  }}
                >
                  FINALIZAR COMPRA
                </button>
              </div>
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
