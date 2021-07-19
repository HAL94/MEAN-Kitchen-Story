import { IECartOrder } from "./orders_and_cart/cart-order.interface";
import { Item } from "./orders_and_cart/item.interface";
import { Product } from "./product.interface";

export interface CartItem extends Item {
    product?: Product;
    qt?: number;
    itemPrice?: number;
}

export interface Cart extends IECartOrder {
    id?: string;
    userId?: string;
    items?: CartItem[];
    totalPrice?: number
}