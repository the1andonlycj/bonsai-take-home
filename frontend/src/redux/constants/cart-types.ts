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