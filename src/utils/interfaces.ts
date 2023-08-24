import { TElementProperty } from "./types";

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  dragId?: string;
  id?: string;
  index?: number;
  elementProperty?: TElementProperty | undefined;
}

export interface IConstructorElementWrapper {
  item: IIngredient;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  deleteItem: (dragId: string) => void;
}
