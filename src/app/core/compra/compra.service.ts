import { environment } from './../../../environments/environment';
import { CompraEvento } from './compra-evento.model';
import { Pageable } from './../model/pageable.mode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from '../evento/evento.model';
import { Observable, EMPTY } from 'rxjs';

const API = environment.apiUrl + "/compras";

export interface Compra {
  idEvento: string;
  qtdIngresso: number;
}

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  save(eventos: Map<string, number>) {
    let compra: Compra[] = this.transformToCompra(eventos);
    return this.http.post(`${API}`, compra)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  getAll(): Observable<Pageable> {
    return this.http.get<Pageable>(`${API}`)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  getCompraEventos(id: string) {
    return this.http.get<CompraEvento[]>(`${API}/${id}/compra-eventos`)
    .pipe(
      map( (obj) => obj),
      catchError(e => this.handleError(e))
    );
  }
  cancelar(id: string) {
    return this.http.patch(`${API}/${id}`, null)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  private transformToCompra(eventos: Map<string, number>){
    let compra: Compra[] = [];
    for(let key of eventos.keys()){
      compra.push({
        idEvento: key,
        qtdIngresso: eventos.get(key)
      });
    }
    return compra;
  }

  private handleError(e: any): Observable<any>{
    console.log(e.error.errors[0]);
    this.showMessage(e.error.errors[0], 5000);
    return EMPTY;
  }

  showMessage(msg?: string, time: number = 3000): void {
    this.snackBar.open(msg, 'X', {
      duration: time,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    })
  }
}
