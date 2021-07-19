import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.interface';
import { Category } from 'src/app/models/category.interface';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from '../../admin-backend/product-listing/product.service';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../main-app/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {  
  user$: Observable<User>;
  auth$: Observable<boolean>;
  cats$: Observable<Category[]>;
  cart$: Observable<Cart>;
  
  @ViewChild('searchForm') searchForm: NgForm;

  constructor(private authService: AuthService,
    private userService: UserService,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.auth$ = this.authService.authObs;    
    this.user$ = this.userService.userObs;
    this.cats$ = this.productService.catObs;
    this.cart$ = this.cartService.cart$;
    this.productService.getCategories();
    this.cartService.getCart();
  }

  logout() {
    this.authService.logout();
    this.cartService.resetCart();
  }

  onSearchSubmit() {
    const searchQuery = this.searchForm.value.search_query;
    const category = this.searchForm.value.category;

    const params = {
      search_query: searchQuery,
      categories: category,
      page: 1,
      pageSize: 4
    }

    this.router.navigate(['/product-search'], {queryParams: params});

  }

}
