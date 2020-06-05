import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './../../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaCasasDeShowComponent, DialogDelete } from './tabela-casas-de-show.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [ TabelaCasasDeShowComponent, DialogDelete ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ TabelaCasasDeShowComponent ]
})
export class TabelaCasasDeShowModule { }
