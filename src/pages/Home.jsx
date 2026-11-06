import { products } from "../services/products";
import ProductCard from "../components/ProductCard";

function Home({ searchTerm = "", activeCategory = "TODOS" }) {
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "TODOS" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1400px",
        margin: "0 auto",
        color: "#fff",
      }}
    >
      {/* Bento Grid: 4 colunas estritas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {/* Renderiza os primeiros 3 cards */}
        {filteredProducts.slice(0, 3).map((product) => (
          <div key={product.id} style={{ gridColumn: "span 1" }}>
            <ProductCard product={product} />
          </div>
        ))}

        {/* 4ª Coluna: Bloco de Destaque GEEK HUB */}
        {activeCategory === "TODOS" && (
          <div
            style={{
              gridColumn: "span 1",
              backgroundColor: "#06160e",
              border: "1px solid rgba(0, 230, 118, 0.4)",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "inset 0 0 40px rgba(0,230,118,0.08)",
            }}
          >
            <h2
              style={{
                fontSize: "2.8rem",
                fontWeight: "900",
                color: "#00e676",
                letterSpacing: "3px",
                margin: 0,
                textShadow: "0 0 20px rgba(0,230,118,0.5)",
              }}
            >
              GEEK
            </h2>
            <h2
              style={{
                fontSize: "2.8rem",
                fontWeight: "900",
                color: "#00e676",
                letterSpacing: "3px",
                margin: 0,
                textShadow: "0 0 20px rgba(0,230,118,0.5)",
              }}
            >
              HUB
            </h2>
          </div>
        )}

        {/* Restante dos cards */}
        {filteredProducts.slice(3).map((product) => (
          <div
            key={product.id}
            style={{
              gridColumn: product.featured ? "span 2" : "span 1",
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
