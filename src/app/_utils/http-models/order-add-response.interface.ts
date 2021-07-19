import { Order } from "src/app/models/order.interface";

export interface OrderAddResponse {
    result?: boolean;
    order?: Order;
}