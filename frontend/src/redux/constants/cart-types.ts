export type ICartItem = {
  image: string;
  price: number;
  name: string;
  chosenType: string;
  chosenValue: string;
  quantityAvailable: number;
  id: string;
  key: string;
  quantityDesired?: number;
}