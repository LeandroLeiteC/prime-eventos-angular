import { MinhasComprasModule } from './minhas-compras/minhas-compras.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { AdminModule } from './admin/admin.module';
import { EventosModule } from './eventos/eventos.module';
import { RequestInterceptor } from './core/interceptor/request.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';

import { HomeModule } from './home/home.module';
import { SignModule } from './sign/sign.module';
import { CoreModule } from './core/core.module';

import { MatSnackBarModule } from '@angular/material/snack-bar'
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common/';
import { LOCALE_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    SignModule,
    EventosModule,
    AdminModule,
    MatSnackBarModule,
    NgbModule,
    CarrinhoModule,
    MinhasComprasModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
