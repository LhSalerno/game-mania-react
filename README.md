# 🛸 Game Mania Store | A loja de Outro Mundo

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Status](https://img.shields.io/badge/status-projeto_de_portf%C3%B3lio-00e676?style=for-the-badge)

> "Sinal recebido, Comandante!" Uma imersão sci-fi no e-commerce de games, onde a alta performance encontra a diversão intergaláctica.

🔗 **Demo ao vivo:** https://game-mania-react.vercel.app

> ⚠️ **Nota de escopo:** este é um projeto de portfólio. O catálogo é mockado e não há pagamento real nem backend. O foco é demonstrar arquitetura front-end, gerenciamento de estado e consumo de API.

---

## ✨ Funcionalidades

- 🔍 **Busca em tempo real** de produtos no cabeçalho
- 🎠 **Carrossel interativo** de destaques na página inicial
- 🛒 **Carrinho global** com Context API e **persistência no LocalStorage**
- 📦 **Consulta de endereço por CEP** via API ViaCEP e cálculo de frete
- 🎟️ **Cupons de desconto** dinâmicos
- 🧑‍🚀 **Identificação do comandante** (nome do cliente) durante a compra
- 🧹 **Limpeza automática** de estado e carrinho após o envio do pedido
- 💬 **Humor e easter eggs** na navegação (Comando de Suprimentos, Rota Interestelar)

### 🎟️ Cupons para testar

| Cupom             | Efeito                                                  |
| ----------------- | ------------------------------------------------------- |
| `ZURG10`          | Concede 10% de desconto sobre o subtotal dos produtos   |
| `BUZZ15`          | Concede 15% de desconto sobre o subtotal dos produtos   |
| `AOINFINITOEALEM` | Ativa Frete Grátis (zera o custo de envio interestelar) |

---

## 💻 Tecnologias

| Tecnologia                                         | Uso no projeto                                                 |
| -------------------------------------------------- | -------------------------------------------------------------- |
| **React.js + Vite**                                | Carregamento rápido e renderização dinâmica                    |
| **React Router DOM**                               | Navegação entre a vitrine e o carrinho sem recarregar a página |
| **Context API + Hooks** (`useState`, `useContext`) | Estado global do carrinho, sem dependências externas           |
| **ViaCEP (API externa)**                           | Consulta assíncrona de endereços                               |
| **LocalStorage**                                   | Mantém o carrinho entre sessões                                |

---

## ⚙️ Como Subir a Nave na sua Máquina

```bash
# 1. Clone o repositório
git clone https://github.com/LhSalerno/game-mania-react.git

# 2. Entre na pasta do projeto
cd game-mania-react

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` e prepare-se para a decolagem! 🚀

---

## 🛠️ Arquitetura

SPA componentizada, com responsabilidades separadas por pasta e fácil de evoluir:

```text
game-mania-react/
├── public/                  # Arquivos estáticos e recursos visuais
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.jsx       # Cabeçalho com navegação e busca em tempo real
│   │   ├── ProductCard.jsx  # Cards de produtos da vitrine
│   │   └── HeroCarousel.jsx # Carrossel de destaques
│   ├── context/
│   │   └── CartContext.jsx  # Estado global do carrinho, regras de frete/cupom e persistência
│   ├── data/
│   │   └── coupons.js       # Base de regras dos cupons promocionais
│   ├── services/
│   │   └── products.js      # Mock do catálogo de produtos
│   ├── utils/
│   │   └── formatters.js    # Utilitários de formatação (ex.: moeda BRL)
│   ├── App.jsx              # Roteamento e layout da SPA
│   ├── index.css            # Design system e estilos globais
│   └── main.jsx             # Ponto de entrada
├── package.json             # Dependências e scripts
└── README.md
```

### 🧠 Decisões técnicas

- **Context API em vez de Redux:** o estado global se resume ao carrinho. Context + hooks resolvem com menos código e sem dependências extras.
- **Persistência no LocalStorage:** o carrinho é salvo a cada alteração e recarregado ao abrir a aplicação, então o usuário não perde os itens ao fechar a aba.
- **Catálogo em `services/products.js`:** isola a fonte de dados. Trocar o mock por uma API real mexe só nessa camada.
- **Formatadores centralizados:** a formatação de moeda (BRL) fica em um único lugar e é reaproveitada pelos componentes.

---

## 🎨 Identidade Visual

Visual escuro e imersivo, com destaque em verde neon (`#00e676`). A ideia é fugir das interfaces corporativas e frias, com uma experiência acolhedora para todos os públicos.

---

## 🗺️ Próximos Passos & Evoluções Futuras

- [ ] Implementação de testes automatizados (Vitest + React Testing Library)
- [ ] Desenvolvimento de uma API Backend própria para persistência de catálogo e pedidos
- [ ] Sistema completo de autenticação de usuários (Login / Cadastro)
- [ ] Integração com gateway de pagamento real (Modo Sandbox / Stripe ou Mercado Pago)
- [ ] Expansão dos filtros avançados de busca por faixa de preço e avaliações

---

## 📖 A História por Trás da Nave

A **Game Mania Store** nasceu de um sonho real: criar um e-commerce que fugisse daquele padrão sem graça e engessado que a gente vê por aí. Quem disse que comprar um console de última geração ou caçar um jogo retrô precisa ser uma experiência burocrática e fria?

Aqui, a navegação virou uma viagem espacial. Queremos que qualquer visitante, seja um recrutador avaliando código ou um gamer procurando seu próximo equipamento, abra a página e sorria ao trombar com as piadas de bordo e o humor descontraído em cada canto da aplicação. Porque tecnologia boa é aquela que funciona com excelência, mas tem alma e personalidade.

---

## 🤝 Parceria de Comando (Humana & IA)

Projeto desenvolvido por mim, Luis Henrique Salerno, como parte da minha jornada no desenvolvimento front-end. Contei com o Gemini como apoio técnico no dia a dia, mas toda a estrutura em React, regras de negócio e ajustes visuais foram construídos e refinados por mim.

---

## 👨‍💻 O Comandante por Trás do Projeto!

> "Setor livre de bugs e das armadilhas do Imperador Zurg! Luis Henrique Salerno no comando da nave. Quer recrutar um novo tripulante para o seu time de tecnologia? Acesse os canais abaixo:"

[![GitHub](https://img.shields.io/badge/GitHub-LhSalerno-181717?style=for-the-badge&logo=github)](https://github.com/LhSalerno)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Luis_Henrique_Salerno-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/luis-henrique-salerno-971654b3/)

---
