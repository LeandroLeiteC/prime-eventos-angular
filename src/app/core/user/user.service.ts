import { CarrinhoService } from './../carrinho/carrinho.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { TokenService } from './../token/token.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  email: string;
  nome: string;
  roles: string[];

  constructor(
    private tokenService: TokenService,
    private carrinhoService: CarrinhoService) {
    this.tokenService.hasToken() && this.decodeAndNotify();
   }

   setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;
    this.email = user.email;
    this.nome = user.nome;
    this.roles = user.roles;
    user.isAdmin = this.isAdmin();
    this.userSubject.next(user);
  }

  logout(){
    this.carrinhoService.removeAll();
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged(): boolean {
    return this.tokenService.hasToken();
  }

  isAdmin(): boolean {
    if(this.isLogged()){
      if(this.getRoles().includes('ADMIN')){
        return true;
      }else{
        return false;
      }
    }
  }

  getEmail(): string {
    return this.email;
  }

  getNome(): string {
    return this.nome;
  }

  getRoles(): string[] {
    return this.roles;
  }
}
