import { IFeedOrder } from './IOrder';

export interface IWSMessage {
  success: boolean;
  orders: IFeedOrder[];
  total: number;
  totalToday: number;
}