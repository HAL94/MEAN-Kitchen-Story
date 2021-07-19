import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { NavigationModule } from '../navigation/navigation.module';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainAuthComponent } from './main-auth/main-auth.component';
import { AfterAuthGuard } from 'src/app/guards/after-auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: MainAuthComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent }
  ], canActivate: [AfterAuthGuard]}  
];


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    MainAuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NavigationModule
  ]
})
export class AuthModule { }
