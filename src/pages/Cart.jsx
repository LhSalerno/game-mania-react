import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } =
    useContext(CartContext);

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
        maxWidth: "800px",
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
        Seu Carrinho de Compras
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => updateQuantity(item.id, -1)}
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
                onClick={() => updateQuantity(item.id, 1)}
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

            {/* Preço Subtotal Formatado e Botão Remover */}
            <div style={{ textAlign: "right", minWidth: "110px" }}>
              <p style={{ margin: "0", fontWeight: "bold", color: "#00e676" }}>
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

      {/* Resumo do Valor Total Formatado */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#1e1e24",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Total da Compra:
        </span>
        <span
          style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#00e676" }}
        >
          {formatCurrency(totalPrice)}
        </span>
      </div>
    </div>
  );
}

export default Cart;
