import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppComponent } from './main-app/main-app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NavigationModule } from '../navigation/navigation.module';
import { CartComponent } from './cart/cart.component';
import { AuthRoleGuard } from 'src/app/guards/auth-role.guard';
import { UserRole } from 'src/app/models/user-roles.enum';
import { ProductSearchListingComponent } from './product-search-listing/product-search-listing.component';
import { NgxPaginationModule } from 'ngx-pagination';


const routes: Routes = [
  { path: '', component: MainAppComponent, children: [
    { path: 'home', component: HomeComponent},
    { path: 'product-search', component: ProductSearchListingComponent},
    { path: 'cart', component: CartComponent, canActivate: [AuthRoleGuard], data: { roles: [UserRole.User]}},
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
  ]}
]

@NgModule({
  declarations: [
    MainAppComponent,
    HomeComponent,
    CartComponent,
    ProductSearchListingComponent    
  ],
  imports: [
    CommonModule,
    SharedModule,
    NavigationModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainAppModule { }
