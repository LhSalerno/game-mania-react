import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Inicializa o estado lendo do localStorage (se houver dados salvos)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("@GameMania:cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Salva no localStorage sempre que o carrinho for alterado
  useEffect(() => {
    localStorage.setItem("@GameMania:cart", JSON.stringify(cart));
  }, [cart]);

  // Adicionar ao carrinho
  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remover item do carrinho
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Alterar quantidade (+1 ou -1)
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCard(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Quantidade total de itens (badge do Header)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Valor total da compra em R$
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
