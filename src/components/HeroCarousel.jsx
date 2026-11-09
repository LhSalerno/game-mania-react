import { useState, useEffect } from "react";
import { formatCurrency } from "../utils/formatters";

const heroProducts = [
  {
    id: "ps5-pro-2tb",
    title: "PLAYSTATION 5 PRO - 2TB",
    category: "Lançamento",
    description:
      "Potência máxima em 4K nativo. Arquitetura gráfica ultra-veloz e 2TB de alta performance para a experiência definitiva.",
    price: 4599.9,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "xbox-series-x",
    title: "XBOX SERIES X - 1TB SSD",
    category: "Consoles",
    description:
      "Velocidade e desempenho de nova geração. Desfrute de jogos em 4K a até 120 FPS com a arquitetura Xbox Velocity.",
    price: 3899.9,
    image:
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "setup-cyberpunk",
    title: "SETUP CYBERPUNK ELITE CUSTOM",
    category: "Hardware",
    description:
      "Máquina preparada para enthusiast gaming com iluminação RGB customizável, refrigeração líquida e placa gráfica de última geração.",
    price: 12499.0,
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function HeroCarousel({ onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const product = heroProducts[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + heroProducts.length) % heroProducts.length,
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "420px",
        backgroundColor: "#121620",
        border: "1px solid #222d42",
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "40px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Imagem de Fundo com Gradiente de Alta Performance */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "100%",
          backgroundImage: `linear-gradient(to right, #121620 0%, rgba(18, 22, 32, 0.75) 30%, transparent 100%), url(${product.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s ease-in-out",
        }}
      />

      {/* Conteúdo de Texto */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 64px",
          maxWidth: "640px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              backgroundColor: "rgba(0, 230, 118, 0.1)",
              color: "#00e676",
              border: "1px solid rgba(0, 230, 118, 0.3)",
              padding: "5px 12px",
              borderRadius: "6px",
              fontSize: "0.72rem",
              fontWeight: "900",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            🔥 DESTAQUE DA SEMANA • {product.category}
          </span>
        </div>

        <h2
          style={{
            color: "#ffffff",
            fontSize: "2.1rem",
            fontWeight: "900",
            margin: 0,
            letterSpacing: "0.5px",
            lineHeight: "1.15",
          }}
        >
          {product.title}
        </h2>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "0.88rem",
            margin: 0,
            lineHeight: "1.5",
            maxWidth: "520px",
          }}
        >
          {product.description}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "8px",
          }}
        >
          <span
            style={{
              color: "#00e676",
              fontSize: "1.6rem",
              fontWeight: "900",
              letterSpacing: "0.5px",
            }}
          >
            {formatCurrency(product.price)}
          </span>

          <button
            onClick={() => onAddToCart(product)}
            style={{
              backgroundColor: "#00e676",
              color: "#07090e",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "900",
              fontSize: "0.82rem",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(0, 230, 118, 0.35)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#00ff80";
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(0, 230, 118, 0.6)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#00e676";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(0, 230, 118, 0.35)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>

      {/* Botão Esquerdo (Voltar) com Identidade Visual Cyberpunk */}
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          backgroundColor: "rgba(9, 13, 20, 0.85)",
          backdropFilter: "blur(6px)",
          color: "#00e676",
          border: "1px solid rgba(0, 230, 118, 0.3)",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "1.3rem",
          fontWeight: "900",
          boxShadow: "0 0 15px rgba(0, 230, 118, 0.15)",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#00e676";
          e.currentTarget.style.color = "#07090e";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 230, 118, 0.6)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(9, 13, 20, 0.85)";
          e.currentTarget.style.color = "#00e676";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 230, 118, 0.15)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        ‹
      </button>

      {/* Botão Direito (Avançar) com Identidade Visual Cyberpunk */}
      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          backgroundColor: "rgba(9, 13, 20, 0.85)",
          backdropFilter: "blur(6px)",
          color: "#00e676",
          border: "1px solid rgba(0, 230, 118, 0.3)",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "1.3rem",
          fontWeight: "900",
          boxShadow: "0 0 15px rgba(0, 230, 118, 0.15)",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#00e676";
          e.currentTarget.style.color = "#07090e";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 230, 118, 0.6)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(9, 13, 20, 0.85)";
          e.currentTarget.style.color = "#00e676";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 230, 118, 0.15)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        ›
      </button>

      {/* Indicadores de Página (Dots) Perfeitamente Centralizados na Base */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "rgba(9, 13, 20, 0.75)",
          backdropFilter: "blur(6px)",
          padding: "6px 14px",
          borderRadius: "20px",
          border: "1px solid rgba(0, 230, 118, 0.2)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
        }}
      >
        {heroProducts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: idx === currentIndex ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: idx === currentIndex ? "#00e676" : "#334155",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow:
                idx === currentIndex
                  ? "0 0 8px rgba(0, 230, 118, 0.6)"
                  : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
