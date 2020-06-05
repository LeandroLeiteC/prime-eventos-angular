import { TabelaCasasDeShowModule } from './tabela-casas-de-show/tabela-casas-de-show.module';
import { TabelaEventosModule } from './tabela-eventos/tabela-eventos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabelaEventosModule,
    TabelaCasasDeShowModule
  ],
  exports:[
    TabelaEventosModule,
    TabelaCasasDeShowModule
  ]
})
export class TabelasModule { }
