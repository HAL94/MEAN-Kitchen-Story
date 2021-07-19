import { IECartOrder } from "./orders_and_cart/cart-order.interface";
import { Item } from "./orders_and_cart/item.interface";
import { Product } from "./product.interface";

export interface OrderItem extends Item {
    product?: Product;
    qt?: number;
    itemPrice?: number;
}

export interface Order extends IECartOrder {
    id?: string;
    userId?: string;
    items?: OrderItem[];
    totalPrice?: number
}