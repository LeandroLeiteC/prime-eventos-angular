import { environment } from './../../../environments/environment';
import { UserForm } from './../../sign/signup/userForm.model';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private userService: UserService) { }

  authenticate(email: string, password: string){
    return this.http.post(`${API}/auth`, {email, password}, { observe: 'response'})
      .pipe(tap( res => {const authToken = res.headers.get('x-access-token');
      this.userService.setToken(authToken);
    }));
  }

  cadastrar(user: UserForm) {
    return this.http.post(`${API}/usuarios`, {nome: user.nome, email: user.email, password: user.password});
  }

  cadastrarAdmin(user: UserForm) {
    return this.http.post(`${API}/usuarios/admin`, {nome: user.nome, email: user.email, password: user.password});
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    })
  }

}
