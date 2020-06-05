import { SignupModule } from './../sign/signup/signup.module';
import { AtualizarEventoModule } from './atualizar-evento/atualizar-evento.module';
import { AtualizarCasaDeShowModule } from './atualizar-casa-de-show/atualizar-casa-de-show.module';
import { NovaCasaDeShowModule } from './nova-casa-de-show/nova-casa-de-show.module';
import { TabelasModule } from './tabelas/tabelas.module';
import { NovoEventoModule } from './novo-evento/novo-evento.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    TabelasModule,
    NovoEventoModule,
    NovaCasaDeShowModule,
    AtualizarCasaDeShowModule,
    AtualizarEventoModule,
    SignupModule
  ]
})
export class AdminModule { }
