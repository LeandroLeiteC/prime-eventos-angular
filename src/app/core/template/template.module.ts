import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavModule } from './sidenav/sidenav.module';
import { HeaderModule } from './header/header.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule,
    SidenavModule,
  ],
  exports: [
    HeaderModule,
    SidenavModule,
  ]
})
export class TemplateModule { }
