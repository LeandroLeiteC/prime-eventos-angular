import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignupModule,
    SigninModule
  ],
  exports: [SignupModule]
})
export class SignModule { }
