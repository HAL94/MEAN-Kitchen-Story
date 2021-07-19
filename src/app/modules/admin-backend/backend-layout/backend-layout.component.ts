import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../customer-listing/customer.service';
import { ProductService } from '../product-listing/product.service';

@Component({
  selector: 'app-backend-layout',
  templateUrl: './backend-layout.component.html',
  styleUrls: ['./backend-layout.component.css']
})
export class BackendLayoutComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.productService.getProducts();
    this.productService.getCategories();
    this.customerService.getCustomers();
  }

  ngOnDestroy() {
    this.productService.prodObs$.next(null);
    this.customerService.customerObs$.next(null);
  }


}
