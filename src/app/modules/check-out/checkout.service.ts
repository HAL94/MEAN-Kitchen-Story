import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentDetails } from 'src/app/models/payment-details.interface';

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {

  constructor(private http: HttpClient) { }

  addPaymentDetails(payment: PaymentDetails) {
    return this.http.post('http://localhost:3000/api/user-payment', payment);
  }
}
