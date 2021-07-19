import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category.interface';
import { ModalService } from 'src/app/modules/shared/modal.service';
import { ProductService } from '../../product-listing/product.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() editCategory;
  @ViewChild('catForm') catForm: NgForm;

  

  constructor(private modalService: ModalService,
    private productService: ProductService) { }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.catForm.valid) {
      const name = this.catForm.value.name;
      const category: Category = {
        name: name
      };

      this.productService.addCategory(category);
      this.closeModal();
    }
  }

  closeModal() {
    this.catForm.reset();
    this.modalService.onCloseModal();
  }
}
