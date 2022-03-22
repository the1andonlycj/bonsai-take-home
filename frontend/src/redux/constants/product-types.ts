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

// export type GroupedOptions = {
  
// }

export type SelectableOption = {
  [key: string]: string[]
}