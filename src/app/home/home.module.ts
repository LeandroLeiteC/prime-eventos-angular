import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './../app-routing.module';

import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './home.component';


@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule
  ]
})
export class HomeModule { }
