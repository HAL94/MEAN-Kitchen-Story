import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PasswordConfirmValidatorDirective } from './password-confirm-validator.directive';

@NgModule({
  declarations: [
    ModalComponent,
    LoadingSpinnerComponent,
    PasswordConfirmValidatorDirective
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    NgbModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ModalComponent,
    LoadingSpinnerComponent,
    PasswordConfirmValidatorDirective,
    
  ]
})
export class SharedModule { }
