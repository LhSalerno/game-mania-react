import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      style={{
        backgroundColor: "#121620",
        border: "1px solid #222d42",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#00e676";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 230, 118, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#222d42";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
      }}
    >
      {/* Imagem do Produto */}
      <div
        style={{
          width: "100%",
          height: "180px",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#090d14",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: "0.9",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <span
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "rgba(7, 9, 14, 0.85)",
            backdropFilter: "blur(4px)",
            color: "#00e676",
            border: "1px solid rgba(0, 230, 118, 0.3)",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "0.68rem",
            fontWeight: "800",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          {product.category}
        </span>
      </div>

      {/* Conteúdo do Card */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                color: "#94a3b8",
                fontWeight: "700",
              }}
            >
              {product.platforms.join(" • ")}
            </span>
            <span style={{ color: "#fbbf24", fontSize: "0.75rem" }}>
              {"★".repeat(product.rating)}
            </span>
          </div>

          <h3
            style={{
              color: "#ffffff",
              fontSize: "0.95rem",
              fontWeight: "800",
              margin: "0 0 8px 0",
              lineHeight: "1.3",
              letterSpacing: "0.3px",
            }}
          >
            {product.title}
          </h3>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.78rem",
              margin: "0 0 16px 0",
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Rodapé do Card: Preço e Botão */}
        <div
          style={{
            borderTop: "1px solid #1e293b",
            paddingTop: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            {product.oldPrice && (
              <span
                style={{
                  display: "block",
                  color: "#64748b",
                  fontSize: "0.72rem",
                  textDecoration: "line-through",
                }}
              >
                R$ {product.oldPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
            <span
              style={{
                color: "#00e676",
                fontSize: "1.05rem",
                fontWeight: "900",
                letterSpacing: "0.5px",
              }}
            >
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            style={{
              backgroundColor: "#00e676",
              color: "#07090e",
              border: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: "900",
              cursor: "pointer",
              boxShadow: "0 0 12px rgba(0, 230, 118, 0.3)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#00ff80";
              e.currentTarget.style.boxShadow =
                "0 0 18px rgba(0, 230, 118, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#00e676";
              e.currentTarget.style.boxShadow =
                "0 0 12px rgba(0, 230, 118, 0.3)";
            }}
          >
            ADICIONAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
