import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ModalService } from '../../shared/modal.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  selectedProduct: Product = {
    imageUrl: '',
    name: '',
    price: 1,
    category: {}
  };
  editMode = false;
  showForm = false;
  prods$: Observable<Product[]>;

  constructor(private modalService: ModalService, private productService: ProductService) { }

  ngOnInit(): void {
    this.modalService.closeModal.subscribe(() => {
      this.showForm = false;
      this.selectedProduct = {
        imageUrl: '',
        name: '',
        price: 1,
        category: {}
      };
    })
    this.prods$ = this.productService.prodObs$;    
  }

  showProductForm(productClicked?: Product) {
    if (productClicked) {
      this.selectedProduct = {...productClicked};
      this.editMode = true;
    } else {
      this.editMode = false;
    }
    this.showForm = true;
  }

  deleteProduct(product: Product) {
    if (confirm(`Are you sure you would like to delete this product: ${product.name}?`)) {
      this.productService.deleteProduct(product);
    }
  }

}
