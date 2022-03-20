// This file contains all of the types for the app:

export type ProductList = {
  products: IProduct[];
}

export type IProduct = {
  name: string;
  description: string;
  defaultImage: string;
  variants: Variant[];  
}

export type Variant = {
  id: string;
  quantity: number;
  image: string;
  isDiscontinued: boolean;
  priceCents: number;
  selectableOptions: SelectableOptions
}

export type SelectableOptions = {
  options: Option[];
}

export type Option = {
  type: string;
  value: string;
}

export type IModalContext = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  modalDetails: IProduct;
  setModalDetails: (product: IProduct) => void;
}