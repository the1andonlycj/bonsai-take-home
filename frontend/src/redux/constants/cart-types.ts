export type ICartItem = {
  image: string;
  price: number;
  name: string;
  chosenOptions?: IChosenOptions[],
  quantityAvailable: number;
  id: string;
  key: string;
  quantityDesired: number;
}

export type IChosenOptions = {
  chosenType: string,
  chosenValue: string,
}