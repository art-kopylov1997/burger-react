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
}

export interface IConstructorElementWrapper {
  item: {
    id: string;
    image: string;
    index: number;
    type: string;
    price: number;
    name: string;
    elementProperty: TElementProperty | undefined;
    dragId: string;
  };
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  deleteItem: (dragId: string) => void;
}
