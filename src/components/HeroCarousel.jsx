import { useState, useEffect } from "react";

function HeroCarousel({ onAddToCart }) {
  const featuredItems = [
    {
      id: 991,
      title: "GTA VI - COLLECTOR'S EDITION",
      subtitle: "PRÉ-VENDA EXCLUSIVA COM ITEM FÍSICO",
      description:
        "Garante já a tua cópia da edição de colecionador com artbook oficial, mapa em tecido e steelbook metálico.",
      price: 399.9,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
      tag: "LANÇAMENTO ESPERADO",
    },
    {
      id: 992,
      title: "PLAYSTATION 5 PRO - 2TB",
      subtitle: "POTÊNCIA MÁXIMA EM 4K NATIVO",
      description:
        "Ray tracing avançado, arquitetura gráfica ultra-rápida e SSD de alta performance para a experiência definitiva.",
      price: 4599.9,
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
      tag: "HARDWARE DE ELITE",
    },
    {
      id: 993,
      title: "ELDEN RING: SHADOW OF THE ERDTREE",
      subtitle: "EXPEDIÇÃO COMPLETA GOTY EDITION",
      description:
        "Inclui o jogo base aclamado pela crítica e a nova expansão monumental com novas áreas, chefes e armas.",
      price: 279.9,
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      tag: "MAIS VENDIDO",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featuredItems.length]);

  const current = featuredItems[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredItems.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #1e293b",
        backgroundColor: "#0b0f17",
        marginBottom: "40px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.7)",
        height: "420px",
        display: "flex",
      }}
    >
      {/* Botão Seta Esquerda */}
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(7, 9, 14, 0.75)",
          backdropFilter: "blur(6px)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "900",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#00e676";
          e.currentTarget.style.color = "#00e676";
          e.currentTarget.style.backgroundColor = "rgba(11, 15, 23, 0.95)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.backgroundColor = "rgba(7, 9, 14, 0.75)";
        }}
      >
        ❮
      </button>

      {/* Botão Seta Direita */}
      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(7, 9, 14, 0.75)",
          backdropFilter: "blur(6px)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "900",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#00e676";
          e.currentTarget.style.color = "#00e676";
          e.currentTarget.style.backgroundColor = "rgba(11, 15, 23, 0.95)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.backgroundColor = "rgba(7, 9, 14, 0.75)";
        }}
      >
        ❯
      </button>

      {/* Lado Esquerdo: Conteúdo */}
      <div
        style={{
          flex: 1.2,
          padding: "50px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(90deg, #07090e 0%, #0b0f17 100%)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(0, 230, 118, 0.1)",
            color: "#00e676",
            border: "1px solid rgba(0, 230, 118, 0.3)",
            padding: "5px 12px",
            borderRadius: "6px",
            fontSize: "0.7rem",
            fontWeight: "900",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "16px",
            width: "fit-content",
          }}
        >
          <span>⚡</span> {current.tag}
        </div>

        <h2
          style={{
            color: "#fff",
            fontSize: "2.1rem",
            fontWeight: "900",
            margin: "0 0 8px 0",
            lineHeight: "1.1",
            letterSpacing: "0.5px",
          }}
        >
          {current.title}
        </h2>

        <p
          style={{
            color: "#00e676",
            fontSize: "0.78rem",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            margin: "0 0 14px 0",
          }}
        >
          {current.subtitle}
        </p>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "0.88rem",
            margin: "0 0 28px 0",
            lineHeight: "1.5",
            maxWidth: "520px",
          }}
        >
          {current.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div>
            <span
              style={{
                display: "block",
                color: "#64748b",
                fontSize: "0.7rem",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Valor Especial
            </span>
            <span
              style={{
                color: "#fff",
                fontSize: "1.6rem",
                fontWeight: "900",
                letterSpacing: "0.5px",
              }}
            >
              R$ {current.price.toFixed(2).replace(".", ",")}
            </span>
          </div>

          <button
            onClick={() =>
              onAddToCart({
                id: current.id,
                title: current.title,
                price: current.price,
                image: current.image,
              })
            }
            style={{
              backgroundColor: "#00e676",
              color: "#07090e",
              border: "none",
              padding: "14px 28px",
              borderRadius: "8px",
              fontWeight: "900",
              fontSize: "0.85rem",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(0, 230, 118, 0.4)",
              transition: "all 0.2s ease",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#00ff80";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(0, 230, 118, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#00e676";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(0, 230, 118, 0.4)";
            }}
          >
            GARANTIR NA PRÉ-VENDA
          </button>
        </div>
      </div>

      {/* Lado Direito: Imagem */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img
          src={current.image}
          alt={current.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: "0.85",
            transition: "transform 0.6s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(270deg, rgba(11,15,23,0.1) 0%, #0b0f17 100%)",
          }}
        />
      </div>

      {/* Indicadores de Paginação Centralizados na Base */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          display: "flex",
          gap: "8px",
          backgroundColor: "rgba(7, 9, 14, 0.7)",
          backdropFilter: "blur(6px)",
          padding: "8px 16px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {featuredItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: currentIndex === idx ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor:
                currentIndex === idx ? "#00e676" : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
