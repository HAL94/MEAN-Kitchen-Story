import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.interface';
import { Product } from 'src/app/models/product.interface';
import { ModalService } from 'src/app/modules/shared/modal.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() editProduct;
  @Input() editMode;

  @ViewChild('prodForm') productForm: NgForm;
  cats$: Observable<Category[]>;

  constructor(private modalService: ModalService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.cats$ = this.productService.cateObs$;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = {        
        imageUrl: this.productForm.value.imageUrl,
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        category: {
          id: this.productForm.value.category,
          name: this.productService.categories.find((cat) => cat.id === this.productForm.value.category).name
        }
      };

      if (this.editMode) {
        product.id = this.editProduct.id;
        this.productService.editProduct(product);
      } else {
        this.productService.addProduct(product);
      }

      this.closeModal();
    }
  }

  closeModal() {    
    this.productForm.reset();
    this.modalService.closeModal.emit();
  }

}
