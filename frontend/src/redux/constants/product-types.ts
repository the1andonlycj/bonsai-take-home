export type IProduct = {
  name: string;
  id: string;
  description: string;
  defaultImage: string;
  variants: Variant[];  
  // Fix?
  groupedOptions?: GroupedOptions;
  isDiscontinued: boolean;
}

export type Variant = {
  id: string;
  quantity: number;
  image: string;
  isDiscontinued: boolean;
  priceCents: number;
  selectableOptions: Option[];
}

export type Option = {
  type: string;
  value: string;
}

export type GroupedOptions = {
  // ESTABLISH A TYPE FOR THIS ONE.
}

export type SelectableOption = {
  [key: string]: string[]
}

export type ICartItem = {
  imageSrc: string;
  price: number;
  name: string;
  chosenType: string;
  chosenValue: string;
  quantityAvailable: number;
  id: string;
  key: number;
  quantityDesired?: number;
}