import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.interface';
import { ModalService } from '../../shared/modal.service';
import { ProductService } from '../product-listing/product.service';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {
  showForm = false;
  selectedCategory: Category = {
    name: ''
  };
  cats$: Observable<Category[]>;

  constructor(private productService: ProductService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.closeModal.subscribe(() => this.showForm = false);
    this.cats$ = this.productService.cateObs$;
  }

  showCategoryForm() {
    this.showForm = true;
  }

}
