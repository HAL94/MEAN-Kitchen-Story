import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.interface';
import { Product } from 'src/app/models/product.interface';
import { CartAddResponse } from 'src/app/_utils/http-models/cart-add-response.interface';
import { ProductSerachResponse } from 'src/app/_utils/http-models/product-search-response.interface';
import { ProductService } from '../../admin-backend/product-listing/product.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-search-listing',
  templateUrl: './product-search-listing.component.html',
  styleUrls: ['./product-search-listing.component.css']
})
export class ProductSearchListingComponent implements OnInit, OnDestroy {  
  prods = [];
  catsChecklist = [];
  cats$: Observable<Category[]>;

  count = 0; 
  page = 1;
  pageSize = 3;
  searchQuery = '';
  categories = 'all';

  isLoading = true;

  subscription: Subscription;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {    
    this.route.queryParams.subscribe((params: any) => {        
      if (params !== null && Object.keys(params).length !== 0) {
        this.searchQuery = params.search_query;
        this.categories = params.categories;
        this.page = params.page;
        this.pageSize = params.pageSize;        
        this.productService.searchProducts(params);
        this.isLoading = true;
      }
      else {
        this.refreshItemResults();
      }
    })
    this.subscription = this.productService.searchProdsObs$.subscribe((obsObj: ProductSerachResponse) => {
      if (obsObj !== null) {
        this.isLoading = false
        this.prods = obsObj.products;
        this.count = obsObj.count;
      }
    })

    this.cats$ = this.productService.cateObs$;    
  }

  onPageChange($event: any) {
    this.page = $event;
    this.refreshItemResults();
  }

  updateCheckedOptions(option: Category, $event) {        
    if ($event.target.checked) {
      this.catsChecklist.push(option.id)
    }
    else {
      for(let i = 0; i < this.catsChecklist.length; i++) {
        if(this.catsChecklist[i] == option.id) {
          this.catsChecklist.splice(i,1);
          break;
        }
      }
    }
    this.categories = this.catsChecklist.length === 0 ? 'all' : this.catsChecklist.join(',');
    this.refreshItemResults();
  }

  refreshItemResults() {
    const params = {
      search_query: this.searchQuery,
      categories: this.categories,
      page: this.page,
      pageSize: this.pageSize
    }
    this.productService.searchProducts(params);
    this.isLoading = true;
  }

  onAddToCart(cartForm: NgForm, product: Product, addProd: any) {
    addProd.classList.add('btn-loading');
    const qt = +cartForm.value.qt;
    const addObs = this.cartService.addToCart(product, qt);

    if (addObs) {
      addObs.subscribe((response: CartAddResponse) => {
        if (response.result) {
          addProd.classList.remove('btn-loading');
          this.cartService.cart.id = response.cartId;
          this.cartService.setCart();
        }    
      })
    }
    
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.productService.searchProdsObs$.next(null);
    }
  }

}
