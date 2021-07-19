import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BackendLayoutComponent } from './backend-layout/backend-layout.component';
import { AuthRoleGuard } from 'src/app/guards/auth-role.guard';
import { UserRole } from 'src/app/models/user-roles.enum';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { BackendSidebarComponent } from './backend-layout/backend-sidebar/backend-sidebar.component';
import { ProductFormComponent } from './product-listing/product-form/product-form.component';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { CategoryFormComponent } from './category-listing/category-form/category-form.component';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [  
  { path: '', redirectTo: 'product-listing', pathMatch: 'full'},
  { path: '', component: BackendLayoutComponent, children: [    
    {path: 'product-listing', component: ProductListingComponent},
    {path: 'category-listing', component: CategoryListingComponent},
    {path: 'customer-listing', component: CustomerListingComponent},
    {path: 'change-password', component: ChangePasswordComponent}

  ], canActivate: [AuthRoleGuard], data: { roles: [UserRole.Admin]}},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    BackendLayoutComponent,
    ProductListingComponent,
    BackendSidebarComponent,
    ProductFormComponent,
    CategoryListingComponent,
    CategoryFormComponent,
    CustomerListingComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class AdminBackendModule { }
