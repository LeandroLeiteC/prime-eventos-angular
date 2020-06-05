import { MinhasComprasComponent } from './minhas-compras/minhas-compras.component';
import { InverseLoggedGuard } from './core/guard/inverse-logged.guard';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { DetalheEventoComponent } from './eventos/detalhe-evento/detalhe-evento.component';
import { AtualizarEventoComponent } from './admin/atualizar-evento/atualizar-evento.component';
import { AtualizarCasaDeShowComponent } from './admin/atualizar-casa-de-show/atualizar-casa-de-show.component';
import { NovaCasaDeShowComponent } from './admin/nova-casa-de-show/nova-casa-de-show.component';
import { NovoEventoComponent } from './admin/novo-evento/novo-evento.component';
import { AdminGuard } from './core/guard/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { EventosComponent } from './eventos/eventos.component';
import { SignupComponent } from './sign/signup/signup.component';
import { LoggedGuard } from './core/guard/logged.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './sign/signin/signin.component';


const routes: Routes = [
{
  path: '',
  component: HomeComponent
},
{
  path: 'login',
  component: SigninComponent,
  canActivate: [LoggedGuard]
},
{
  path: 'cadastro',
  component: SignupComponent,
  canActivate: [LoggedGuard]
},
{
  path: 'eventos',
  component: EventosComponent
},
{
  path: 'carrinho',
  component: CarrinhoComponent,
  canActivate: [InverseLoggedGuard]
},
{
  path: 'minhas-compras',
  component: MinhasComprasComponent,
  canActivate: [InverseLoggedGuard]
},
{
  path: 'eventos/:id',
  component: DetalheEventoComponent
},
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AdminGuard]
},
{
  path: 'admin/evento/cadastrar',
  component: NovoEventoComponent,
  canActivate: [AdminGuard]
},
{
  path: 'admin/evento/atualizar/:id',
  component: AtualizarEventoComponent,
  canActivate: [AdminGuard]
},
{
  path: 'admin/casa-de-show/cadastrar',
  component: NovaCasaDeShowComponent,
  canActivate: [AdminGuard]
},
{
  path: 'admin/casa-de-show/atualizar/:id',
  component: AtualizarCasaDeShowComponent,
  canActivate: [AdminGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
