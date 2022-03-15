import { createContext, useState, FC } from "react";

interface ICartContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Why does setIsOpen show null here but void above? Just inconsistent?
export const CartContext = createContext<ICartContext>({
  isOpen: false,
  setIsOpen: () => null,
});

export const CartProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = { isOpen, setIsOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
