import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './../app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardModule } from './card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoComponent, CarrinhoDialog } from './carrinho.component';



@NgModule({
  declarations: [CarrinhoComponent, CarrinhoDialog],
  imports: [
    CommonModule,
    CardModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class CarrinhoModule { }
