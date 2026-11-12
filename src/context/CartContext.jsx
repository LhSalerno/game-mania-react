import { createContext, useState, useEffect } from "react";
import { VALID_COUPONS } from "../data/coupons";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Inicializa o carrinho do localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("@GameMania:cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Estados de Cupom e Frete por CEP
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState({
    text: "",
    isError: false,
  });

  const [cep, setCep] = useState(() => {
    return localStorage.getItem("@GameMania:cep") || "";
  });

  const [addressData, setAddressData] = useState(() => {
    const savedAddress = localStorage.getItem("@GameMania:address");
    return savedAddress ? JSON.parse(savedAddress) : null;
  });

  const [cepLoading, setCepLoading] = useState(false);
  const [shippingCost, setShippingCost] = useState(() => {
    const savedAddress = localStorage.getItem("@GameMania:address");
    return savedAddress ? 28.5 : 0;
  });

  // Persistência automática no localStorage
  useEffect(() => {
    localStorage.setItem("@GameMania:cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("@GameMania:cep", cep);
    if (addressData) {
      localStorage.setItem("@GameMania:address", JSON.stringify(addressData));
    } else {
      localStorage.removeItem("@GameMania:address");
    }
  }, [cep, addressData]);

  // CORREÇÃO CRUCIAL: Se há um CEP salvo na máquina mas o endereço não está carregado na memória ao iniciar, busca automaticamente na API!
  useEffect(() => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8 && !addressData) {
      const fetchSavedCep = async () => {
        setCepLoading(true);
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${cleanCep}/json/`,
          );
          const data = await response.json();

          if (!data.erro) {
            setAddressData(data);
            setShippingCost(28.5);
          } else {
            setAddressData(null);
            setShippingCost(0);
          }
        } catch (error) {
          console.error("Erro ao recuperar CEP salvo:", error);
        } finally {
          setCepLoading(false);
        }
      };
      fetchSavedCep();
    }
  }, []);

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

  // Remover item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Esvaziar carrinho e limpar cache da máquina
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponCodeInput("");
    setCouponMessage({ text: "", isError: false });
    setCep("");
    setAddressData(null);
    setShippingCost(0);
    localStorage.removeItem("@GameMania:cep");
    localStorage.removeItem("@GameMania:address");
  };

  // Atualizar quantidade
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Consulta de CEP (ViaCEP) com salvamento em tempo real
  const handleCepChange = async (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
    setCep(value);

    const cleanCep = value.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setCepLoading(true);
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCep}/json/`,
        );
        const data = await response.json();

        if (!data.erro) {
          setAddressData(data);
          setShippingCost(28.5);
        } else {
          setAddressData(null);
          setShippingCost(0);
          alert("CEP não encontrado na base nacional.");
        }
      } catch (error) {
        console.error("Erro ao consultar CEP:", error);
      } finally {
        setCepLoading(false);
      }
    } else {
      setAddressData(null);
      setShippingCost(0);
    }
  };

  // Aplicar Cupom
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();

    if (!cleanCode) {
      setCouponMessage({ text: "Digite um código de cupom.", isError: true });
      return;
    }

    if (VALID_COUPONS[cleanCode]) {
      setAppliedCoupon(VALID_COUPONS[cleanCode]);
      setCouponMessage({
        text: `Cupom ${cleanCode} aplicado com sucesso! (${VALID_COUPONS[cleanCode].description})`,
        isError: false,
      });
    } else {
      setAppliedCoupon(null);
      setCouponMessage({
        text: "Cupom inválido ou expirado. (Experimente: ZURG10, BUZZ15 ou AOINFINITOEALEM)",
        isError: true,
      });
    }
  };

  // Remover Cupom
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCodeInput("");
    setCouponMessage({ text: "Cupom removido.", isError: false });
  };

  // Matemática Financeira Centralizada
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  let discountAmount = 0;
  let effectiveShippingCost = shippingCost;

  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discountAmount = subtotalPrice * appliedCoupon.value;
    } else if (appliedCoupon.type === "frete_gratis") {
      effectiveShippingCost = 0;
    }
  }

  const totalPrice = Math.max(
    0,
    subtotalPrice - discountAmount + effectiveShippingCost,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        totalItems,
        subtotalPrice,
        discountAmount,
        shippingCost: effectiveShippingCost,
        totalPrice,
        cep,
        handleCepChange,
        addressData,
        cepLoading,
        couponCodeInput,
        setCouponCodeInput,
        appliedCoupon,
        couponMessage,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
