import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { MainCheckoutComponent } from './main-checkout/main-checkout.component';
import { AuthRoleGuard } from 'src/app/guards/auth-role.guard';
import { UserRole } from 'src/app/models/user-roles.enum';
import { SharedModule } from '../shared/shared.module';
import { NavigationModule } from '../navigation/navigation.module';
import { ConfirmationComponent } from './confirmation/confirmation.component';


const routes: Routes = [
  // { path: '', redirectTo: '/:cartId', pathMatch: 'full'},
  { path: '', component: MainCheckoutComponent, children: [
    { path: 'payment', component: CheckoutComponent },
    { path: 'confirmation', component: ConfirmationComponent }
  ], canActivate: [AuthRoleGuard], data: { roles: [UserRole.User]}},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    MainCheckoutComponent,
    CheckoutComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    NavigationModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  providers: [
  ]  
})
export class CheckOutModule { }
