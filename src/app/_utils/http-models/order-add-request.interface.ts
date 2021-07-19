export interface OrderAddRequest {
    items: { product: string, qt: number, itemPrice: number} [];
    totalPrice: number;
}