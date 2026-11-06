import { useState } from "react";
import { products } from "../services/products";
import ProductCard from "../components/ProductCard";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Extrair categorias únicas dos produtos para criar os botões dinamicamente
  const categories = [
    "Todos",
    ...new Set(products.map((item) => item.category)),
  ];

  // Filtrar produtos com base na busca e na categoria selecionada
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        color: "#fff",
      }}
    >
      {/* Barra de Pesquisa e Filtros */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {/* Input de Busca */}
        <input
          type="text"
          placeholder="Pesquisar jogos, consoles, acessórios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: "#1e1e24",
            border: "1px solid #333",
            color: "#fff",
            fontSize: "1rem",
            outline: "none",
            width: "100%",
            maxWidth: "500px",
          }}
        />

        {/* Botões de Categoria */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                backgroundColor:
                  selectedCategory === category ? "#00e676" : "#1e1e24",
                color: selectedCategory === category ? "#121214" : "#fff",
                border: "1px solid #333",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem",
                transition: "all 0.2s",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Vitrine de Produtos */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#b2b2b2" }}>
          <h3>Nenhum produto encontrado 🔍</h3>
          <p>Tente procurar por outro termo ou limpar os filtros.</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
