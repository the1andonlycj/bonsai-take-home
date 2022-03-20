// export interface ProductList {
//   products: IProduct[];
// }

export type IProduct = {
  name: string;
  id: string;
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
  selectableOptions: Option[];
}

export type Option = {
  type: string;
  value: string;
}