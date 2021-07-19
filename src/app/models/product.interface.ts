import { Category } from "./category.interface";

export interface Product {
    id?: string;
    imageUrl?: string;
    name?: string;
    price?: number;
    category?: Category;
}