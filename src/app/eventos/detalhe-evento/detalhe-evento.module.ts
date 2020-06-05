import { CardModule } from './../card/card.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalheEventoComponent } from './detalhe-evento.component';



@NgModule({
  declarations: [DetalheEventoComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule
  ]
})
export class DetalheEventoModule { }
