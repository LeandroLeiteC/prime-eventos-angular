import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  
  hasToken(): boolean {
    return !!this.getToken();
  }

  setToken(token) {
    window.localStorage.setItem("authToken", token);
  }

  getToken() {
    return window.localStorage.getItem("authToken");
  }

  removeToken() {
    window.localStorage.removeItem("authToken");
  }
}
