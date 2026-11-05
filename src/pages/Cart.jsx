import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart } = useContext(CartContext);

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
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 5px 0" }}>{item.title}</h4>
              <span style={{ fontSize: "0.85rem", color: "#00e676" }}>
                {item.category}
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: "0", fontWeight: "bold" }}>
                R$ {item.price.toFixed(2)}
              </p>
              <span style={{ fontSize: "0.85rem", color: "#b2b2b2" }}>
                Qtd: {item.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
