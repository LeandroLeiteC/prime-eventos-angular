import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetalheEventoModule } from './detalhe-evento/detalhe-evento.module';
import { MatIconModule } from '@angular/material/icon';
import { CardModule } from './card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosComponent } from './eventos.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [EventosComponent],
  imports: [
    CommonModule,
    CardModule,
    MatGridListModule,
    InfiniteScrollModule,
    MatIconModule,
    DetalheEventoModule,
    MatProgressSpinnerModule
  ]
})
export class EventosModule { }
