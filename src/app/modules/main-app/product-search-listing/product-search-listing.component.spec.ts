import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchListingComponent } from './product-search-listing.component';

describe('ProductSearchListingComponent', () => {
  let component: ProductSearchListingComponent;
  let fixture: ComponentFixture<ProductSearchListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSearchListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
