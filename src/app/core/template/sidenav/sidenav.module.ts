import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './../../../app-routing.module';

import { SidenavComponent } from './sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [ SidenavComponent ]
})
export class SidenavModule { }
