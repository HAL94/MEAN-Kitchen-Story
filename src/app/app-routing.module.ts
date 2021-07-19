import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin-backend', loadChildren: () => import('./modules/admin-backend/admin-backend.module').then(m => m.AdminBackendModule)},
  { path: 'checkout/:cartId', loadChildren: () => import('./modules/check-out/check-out.module').then(m => m.CheckOutModule)}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
