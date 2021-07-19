import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/category.interface';
import { Product } from 'src/app/models/product.interface';
import { ProductSerachResponse } from 'src/app/_utils/http-models/product-search-response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  products: Product[] = [];
  categories: Category[] = [];  

  prodObs$ = new BehaviorSubject<Product[]>(null);
  cateObs$ = new BehaviorSubject<Category[]>(this.categories);
  searchProdsObs$ = new BehaviorSubject<ProductSerachResponse>(null);

  constructor(private http: HttpClient) { }

  get catObs() {
    return this.cateObs$;
  }

  get searchProdsObs() {
    return this.searchProdsObs$;
  }
  
  addProduct(product: Product) {
    this.http.post<Product>(environment.HTTP_URLS.PRODUCTS, product).subscribe((savedProduct: Product) => {
      console.log(savedProduct);
      this.products.push(savedProduct);
      this.prodObs$.next([...this.products]);
    });
  }

  editProduct(product: Product) {
    this.http.put<Product>(environment.HTTP_URLS.PRODUCTS + product.id, product)
    .subscribe((product) => {            
      const prodIndex = this.products.findIndex((prod) => prod.id === product.id);      
      this.products[prodIndex] = {...product};
      this.prodObs$.next([...this.products]);
    })
  }

  deleteProduct(product: Product) {
    this.http.delete<boolean>(environment.HTTP_URLS.PRODUCTS + product.id)
    .subscribe((success: boolean) => {
      if (success) {
        const prodsFiltered = this.products.filter((prod) => prod.id !== product.id);
        this.products = [...prodsFiltered];
        this.prodObs$.next([...this.products]);
      }
    })
  }

  addCategory(category: Category) {
    this.http.post<Category>(environment.HTTP_URLS.CATEGORIES, category)
    .subscribe((savedCategory) => {
      console.log(savedCategory);
      this.categories.push(savedCategory);
      this.cateObs$.next([...this.categories]);
    })
  }

  getProducts() {
    this.http.get<Product[]>(environment.HTTP_URLS.PRODUCTS)
    .subscribe((prods: Product[]) => {           
      this.products = [...prods];
      this.prodObs$.next([...this.products]);
    })
  }

  getCategories() {
    this.http.get<Category[]>(environment.HTTP_URLS.CATEGORIES)
    .subscribe((cats: Category[]) => {
      // console.log(cats);
      this.categories = [...cats];
      this.cateObs$.next([...this.categories]);
    })
  }

  searchProducts(params: any = {search_query: '', categories: 'all', page: 1, pageSize: 3}) {
      // console.log(params);
    const httpParams = new HttpParams()
        .set('search_query', params.search_query)
        .append('categories', params.categories)
        .append('page', params.page)
        .append('pageSize', params.pageSize);
    
    this.http.get<ProductSerachResponse>(environment.HTTP_URLS.PRODUCTS_SEARCH, { params: httpParams})
      .subscribe((resObj) => {
        // console.log(resObj);
        this.searchProdsObs$.next({...resObj});
      })
  }

}
