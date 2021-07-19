import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  customers: Customer[] = []
  customerObs$ = new BehaviorSubject<Customer[]>(null);

  constructor(private http: HttpClient) { }

  getCustomers() {
    this.http.get<{[key: string]: Customer[]}>(environment.HTTP_URLS.CUSTOMERS)
      .subscribe((custObj: {customers: Customer[]}) => {
        this.customers = [...custObj.customers];
        this.customerObs$.next([...this.customers]);
      })
  }
}
