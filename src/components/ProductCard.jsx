import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      style={{
        backgroundColor: "#121214",
        borderRadius: "12px",
        overflow: "hidden",
        width: "260px",
        border: "1px solid #202024",
        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        transition:
          "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = "#00e676";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,230,118,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#202024";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.4)";
      }}
    >
      <div style={{ width: "100%", height: "160px", overflow: "hidden" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s",
          }}
        />
      </div>

      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flex: 1,
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "#00e676",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {product.category}
        </span>

        <h3
          style={{
            fontSize: "1rem",
            margin: "0",
            fontWeight: "600",
            lineHeight: "1.4",
          }}
        >
          {product.title}
        </h3>

        <p
          style={{
            fontSize: "0.85rem",
            color: "#8d8d99",
            flex: 1,
            margin: "0",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px solid #202024",
          }}
        >
          <span
            style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#00e676" }}
          >
            {formatCurrency(product.price)}
          </span>

          <button
            onClick={() => addToCart(product)}
            style={{
              backgroundColor: "#00e676",
              color: "#121214",
              border: "none",
              padding: "8px 14px",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s, transform 0.1s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#00b359")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#00e676")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
