import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      style={{
        backgroundColor: "#111418",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #1e232a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Imagem do Produto */}
      <div
        style={{
          width: "100%",
          height: "170px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Conteúdo */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flex: 1,
        }}
      >
        {/* Título + Ícones de Plataforma */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          <h3
            style={{
              fontSize: "0.85rem",
              margin: "0",
              fontWeight: "800",
              letterSpacing: "0.5px",
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            {product.title}
          </h3>
          <div
            style={{
              display: "flex",
              gap: "4px",
              color: "#8a94a6",
              fontSize: "0.7rem",
              fontWeight: "bold",
            }}
          >
            {product.platforms?.map((p) => (
              <span
                key={p}
                style={{
                  backgroundColor: "#1b2028",
                  padding: "2px 4px",
                  borderRadius: "4px",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Avaliação por Estrelas */}
        <div
          style={{
            color: "#00e676",
            fontSize: "0.75rem",
            letterSpacing: "2px",
          }}
        >
          {"★".repeat(product.rating || 5)}
        </div>

        {/* Bloco de Preços e Botão */}
        <div style={{ marginTop: "auto", paddingTop: "10px" }}>
          {product.oldPrice && (
            <div
              style={{
                fontSize: "0.75rem",
                color: "#8a94a6",
                textDecoration: "line-through",
              }}
            >
              {formatCurrency(product.oldPrice)}
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "4px",
            }}
          >
            <span
              style={{
                fontSize: "1.1rem",
                fontWeight: "900",
                color: "#00e676",
              }}
            >
              {formatCurrency(product.price)}
            </span>

            <button
              onClick={() => addToCart(product)}
              style={{
                backgroundColor: "#00e676",
                color: "#09090b",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                fontWeight: "900",
                cursor: "pointer",
                fontSize: "0.7rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                textTransform: "uppercase",
              }}
            >
              <span>🛒</span> ADICIONAR AO CARRINHO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
