export interface CartAddRequest {
    items: { product: string, qt: number, itemPrice: number} [];
    totalPrice: number;
}