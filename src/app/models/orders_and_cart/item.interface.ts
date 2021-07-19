import { Product } from "../product.interface";

export interface Item {
    product?: Product;
    qt?: number;
    itemPrice?: number;
}