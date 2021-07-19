import { Product } from "src/app/models/product.interface";

export interface ProductSerachResponse {
    products: Product[];
    count: number;
}