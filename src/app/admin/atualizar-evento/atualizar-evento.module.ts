import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { CurrencyPipe, DatePipe } from '@angular/common'
import { AtualizarEventoComponent } from './atualizar-evento.component';



@NgModule({
  declarations: [AtualizarEventoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSelectInfiniteScrollModule,
  ],
  providers: [ CurrencyPipe, DatePipe ]
})
export class AtualizarEventoModule { }
