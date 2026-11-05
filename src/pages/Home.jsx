import { products } from "../services/products";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>
        Catálogo de Jogos - Game Mania Store
      </h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
