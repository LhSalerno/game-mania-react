import { products } from "../services/products";

function Home() {
  return (
    <div>
      <h2>Catálogo de Jogos - Game Mania Store</h2>
      <p>Total de produtos cadastrados: {products.length}</p>
    </div>
  );
}

export default Home;
