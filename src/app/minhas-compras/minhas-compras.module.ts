import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './../app-routing.module';
import { PanelModule } from './panel/panel.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhasComprasComponent } from './minhas-compras.component';



@NgModule({
  declarations: [MinhasComprasComponent],
  imports: [
    CommonModule,
    PanelModule,
    AppRoutingModule,
    MatButtonModule
  ]
})
export class MinhasComprasModule { }
