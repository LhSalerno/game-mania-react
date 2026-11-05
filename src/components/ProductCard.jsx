import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      style={{
        backgroundColor: "#1e1e24",
        borderRadius: "8px",
        overflow: "hidden",
        width: "250px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <div
        style={{
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: 1,
        }}
      >
        <span
          style={{ fontSize: "0.8rem", color: "#00e676", fontWeight: "bold" }}
        >
          {product.category}
        </span>
        <h3 style={{ fontSize: "1rem", margin: "0" }}>{product.title}</h3>
        <p
          style={{ fontSize: "0.9rem", color: "#b2b2b2", flex: 1, margin: "0" }}
        >
          {product.description}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <span
            style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#00e676" }}
          >
            R$ {product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            style={{
              backgroundColor: "#00e676",
              color: "#121214",
              border: "none",
              padding: "8px 12px",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
