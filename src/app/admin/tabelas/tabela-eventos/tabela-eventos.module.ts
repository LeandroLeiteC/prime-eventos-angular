import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './../../../app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaEventosComponent } from './tabela-eventos.component';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [ TabelaEventosComponent ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [ TabelaEventosComponent ]
})
export class TabelaEventosModule { }
