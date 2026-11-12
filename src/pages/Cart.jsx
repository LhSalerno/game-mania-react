import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    subtotalPrice,
    discountAmount,
    shippingCost,
    couponCodeInput,
    setCouponCodeInput,
    applyCoupon,
    appliedCoupon,
    couponMessage,
    removeCoupon,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#fff" }}>
        <h2>Seu carrinho está vazio 🛒</h2>
        <p style={{ color: "#b2b2b2", margin: "20px 0" }}>
          Você ainda não adicionou nenhum jogo ao seu carrinho.
        </p>
        <Link
          to="/"
          style={{
            backgroundColor: "#00e676",
            color: "#121214",
            padding: "10px 20px",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        color: "#fff",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #333",
          paddingBottom: "10px",
        }}
      >
        MEU CARRINHO DE COMPRAS
      </h2>

      {/* Layout principal em duas colunas */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* Coluna Esquerda: Lista de Produtos */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#1e1e24",
                padding: "15px",
                borderRadius: "8px",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "80px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />

              <div style={{ flex: 1, minWidth: "150px" }}>
                <h4 style={{ margin: "0 0 5px 0" }}>{item.title}</h4>
                <span style={{ fontSize: "0.85rem", color: "#00e676" }}>
                  {item.category}
                </span>
              </div>

              {/* Controles de Quantidade */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    backgroundColor: "#333",
                    color: "#fff",
                    border: "none",
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  -
                </button>

                <span style={{ fontWeight: "bold" }}>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    backgroundColor: "#333",
                    color: "#fff",
                    border: "none",
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  +
                </button>
              </div>

              {/* Preço Subtotal e Botão Remover */}
              <div style={{ textAlign: "right", minWidth: "110px" }}>
                <p
                  style={{ margin: "0", fontWeight: "bold", color: "#00e676" }}
                >
                  {formatCurrency(item.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ff4d4d",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    marginTop: "5px",
                    textDecoration: "underline",
                  }}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coluna Direita: Painel Lateral */}
        <div
          style={{
            width: "350px",
            minWidth: "280px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Bloco de Frete - Entrega de Outro Mundo */}
          <div
            style={{
              backgroundColor: "#1e1e24",
              border: "1px solid #333",
              borderRadius: "8px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.3rem" }}>🛸</span>
              <div>
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  ENTREGA DE OUTRO MUNDO
                </h3>
                <p
                  style={{
                    color: "#b2b2b2",
                    fontSize: "0.75rem",
                    margin: "2px 0 0 0",
                  }}
                >
                  Consulte o frete e descubra a velocidade da nave até a sua
                  base.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", marginTop: "5px" }}>
              <input
                type="text"
                placeholder="Digite seu CEP"
                maxLength={9}
                style={{
                  flex: 1,
                  backgroundColor: "#121214",
                  border: "1px solid #444",
                  borderRadius: "4px",
                  padding: "8px 10px",
                  color: "#fff",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
              />
              <button
                style={{
                  backgroundColor: "#00e676",
                  color: "#121214",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                CALCULAR
              </button>
            </div>
          </div>

          {/* Cupom de Desconto */}
          <div
            style={{
              backgroundColor: "#1e1e24",
              border: "1px solid #333",
              borderRadius: "8px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
              CUPOM DE DESCONTO
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="EX: ZURG10"
                value={couponCodeInput}
                onChange={(e) => setCouponCodeInput(e.target.value)}
                style={{
                  flex: 1,
                  backgroundColor: "#121214",
                  border: "1px solid #444",
                  borderRadius: "4px",
                  padding: "8px 10px",
                  color: "#fff",
                  fontSize: "0.85rem",
                  outline: "none",
                  textTransform: "uppercase",
                }}
              />
              <button
                type="button"
                onClick={() => applyCoupon(couponCodeInput)}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                APLICAR
              </button>
            </div>

            {/* Mensagem de Feedback */}
            {couponMessage.text && (
              <span
                style={{
                  fontSize: "0.8rem",
                  color: couponMessage.isError ? "#ff4d4d" : "#00e676",
                }}
              >
                {couponMessage.text}
              </span>
            )}

            {/* Cupom Ativo */}
            {appliedCoupon && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "4px",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "#00e676" }}>
                  Ativo: <strong>{appliedCoupon.code}</strong>
                </span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ff4d4d",
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

          {/* Resumo do Valor Total e Finalização */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#1e1e24",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.9rem",
                color: "#b2b2b2",
              }}
            >
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotalPrice)}</span>
            </div>

            {discountAmount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.9rem",
                  color: "#00e676",
                }}
              >
                <span>Desconto:</span>
                <span>- {formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.9rem",
                color: "#b2b2b2",
              }}
            >
              <span>Frete:</span>
              <span>
                {shippingCost === 0 ? "GRÁTIS" : formatCurrency(shippingCost)}
              </span>
            </div>

            <hr style={{ borderColor: "#333", margin: "5px 0" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                Total Geral:
              </span>
              <span
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: "#00e676",
                }}
              >
                {formatCurrency(totalPrice)}
              </span>
            </div>

            <button
              style={{
                width: "100%",
                backgroundColor: "#00e676",
                color: "#121214",
                border: "none",
                padding: "12px",
                borderRadius: "6px",
                fontWeight: "900",
                fontSize: "0.9rem",
                cursor: "pointer",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              FINALIZAR COMPRA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
