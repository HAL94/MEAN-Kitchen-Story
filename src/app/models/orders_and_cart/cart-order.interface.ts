import { Item } from "./item.interface";

export interface IECartOrder {
    id?: string;
    userId?: string;
    items?: Item[];
    totalPrice?: number
}