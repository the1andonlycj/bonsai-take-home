import { createContext, useState, FC } from "react";

export interface IProduct {
  name: string;
  description: string;
  defaultImage: string;
  variants: Variant[];  
}

interface Variant {
  id: string;
  quantity: number;
  image: string;
  isDiscontinued: boolean;
  priceCents: number;
  selectableOptions: selectableOptions
}

interface selectableOptions {
  options: Option[];
}

interface Option {
  type: string;
  value: string;
}

interface IModalContext {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  modalDetails: IProduct;
  setModalDetails: (product: IProduct) => void;
}

// We can establish more stateful objects here to hold the actual data that needs to make it to the modal???

export const ModalContext = createContext<IModalContext>({
  isModalOpen: true,
  setIsModalOpen: () => null,
  modalDetails: {name: '',
    description: '',
    defaultImage: '',
    variants: []
  },
  setModalDetails: () => null
});

export const ModalProvider: FC = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    name: '',
    description: '',
    defaultImage: '',
    variants: []
  });
  const value = { isModalOpen, setIsModalOpen, modalDetails, setModalDetails };
  
  return <ModalContext.Provider  value={value}>{children}</ModalContext.Provider>;
};
