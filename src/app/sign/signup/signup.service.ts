import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  checkEmailTaken(email: string) {
    return this.http.get(`${API}/usuarios?email=${email}`);
  }
}
