# 🛸 Game Mania Store | A loja de Outro Mundo

> "Sinal recebido, Comandante!" Uma imersão sci-fi no e-commerce de games, onde a alta performance encontra a diversão intergaláctica. Desenvolvido por quem vive a tecnologia e construído com paixão linha por linha.

---

## 🌌 A História por Trás da Nave (Nossa Origem)

A **Game Mania Store** nasceu de um sonho real: criar um e-commerce que fugisse daquele padrão sem graça e engessado que a gente vê por aí. Quem disse que comprar um console de última geração ou caçar um jogo retro precisa ser uma experiência burocrática e fria?

Aqui, a gente transformou a navegação em uma verdadeira viagem espacial. Queremos que qualquer visitante — seja um recrutador avaliando código ou um gamer procurando seu próximo equipamento — abra a página e sinta um sorriso no rosto ao trombar com as nossas piadas de bordo, o rastreio de rota estelar e o humor descontraído que colocamos em cada canto da aplicação. Porque tecnologia boa é aquela que funciona com excelência, mas tem alma e personalidade.

---

## 🤝 Parceria de Comando (Humana & AI)

Este projeto não foi gerado por robôs de forma automática; ele foi **idealizado, estruturado e esculpido a quatro mãos** pelo desenvolvedor **Luis Henrique Salerno** com a mentoria e o suporte técnico do **Gemini** como copiloto de engenharia. Cada decisão de arquitetura, cada componente React, cada tratamento de estado e cada detalhe de interface passou pelo crivo humano, garantindo que o código reflita a verdadeira identidade e a evolução técnica do autor.

---

## 🚀 O Que Torna a Game Mania Store Única?

- **Identidade Visual Marcante (Sem Preconceitos):** Nada de interfaces corporativas chatas. Desenhamos um visual escuro e imersivo com tons neon (`#00e676`), focado em uma experiência de alto nível, porém aberta, receptiva e feita para todos os públicos.
- **Humor e Easter Eggs na Navegação:** Mensagens dinâmicas que interagem com o usuário (como o _Comando de Suprimentos_ e a _Rota Interestelar_), transformando um carrinho de compras comum em uma base de lançamento espacial.
- **Experiência de Compra Fluida e Real:**
  - Identificação interativa do comandante.
  - Cálculo de frete em tempo real integrado via API ViaCEP.
  - Sistema de cupons de desconto dinâmicos.
  - Limpeza automática de estado e carrinho após a transmissão do pedido.

---

## 🛠️ Mapeamento Técnico & Arquitetura

O projeto foi estruturado seguindo padrões de mercado de uma Single Page Application (SPA) moderna, componentizada e altamente escalável:

```text
game-mania-store/
├── public/                  # Arquivos estáticos e recursos visuais
├── src/
│   ├── components/          # Componentes modulares reutilizáveis
│   │   ├── Header.jsx       # Cabeçalho com navegação e busca em tempo real
│   │   ├── ProductCard.jsx  # Cards de produtos da vitrine
│   │   └── HeroCarousel.jsx # Carrossel interativo de destaque estelar
│   ├── context/
│   │   └── CartContext.jsx  # Gerenciamento de estado global do carrinho e persistência
│   ├── services/
│   │   └── products.js      # Mock estruturado do catálogo de produtos
│   ├── utils/
│   │   └── formatters.js    # Utilitários de formatação (ex: moeda BRL)
│   ├── App.jsx              # Roteamento central e layout estrutural da SPA
│   ├── index.css            # Design system e estilização global
│   └── main.jsx             # Ponto de entrada da aplicação React
├── package.json             # Dependências e scripts do projeto (Vite, React, Router)
└── README.md                # O diário de bordo oficial da nave
```

---

## 💻 Tecnologias Empregadas

- **React.js & Vite:** Performance máxima.
- **React Router DOM:** Rotas fluidas.
- **Context API:** Gestão de estado global.
- **ViaCEP:** Integração de frete.
- **LocalStorage:** Persistência de sessões.

---

## ⚙️ Como Executar e Subir

git clone https://github.com/LhSalerno/game-mania-react.git  
cd game-mania-react  
npm install  
npm run dev

---

👨‍💻 O Comandante  
Desenvolvido por  
Luis Henrique Salerno.  
GitHub: @LuisSalerno
