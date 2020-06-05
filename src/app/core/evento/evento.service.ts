import { environment } from './../../../environments/environment';
import { Evento } from './evento.model';
import { EventoForm } from './evento-form.model';
import { Observable, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '../model/pageable.mode';
import { map, catchError } from 'rxjs/operators';

const API = environment.apiUrl + "/eventos";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  getAll(page: number, status: string = ''): Observable<Pageable> {
    return this.http.get<Pageable>(`${API}?page=${page}&status=${status}`)
    .pipe(map( (obj) => obj),
    catchError(e => this.handleError(e)));
  }

  ocultar(id: number, status: string): Observable<any>{
    return this.http.patch(`${API}/${id}`, null, { params: {status}})
      .pipe(
      map( (obj) => obj),
      catchError(e => this.handleError(e))
      );
  }

  save(evento: EventoForm): Observable<Evento>{
   return this.http.post<Evento>(API, evento)
    .pipe(
      map( (obj) => obj),
      catchError(e => this.handleError(e))
    );
  }

  getById(id: string): Observable<Evento> {
    return this.http.get(`${API}/${id}`)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  getAllById(ids: string[]): Observable<Pageable> {
    var url: string = '';
    var size = ids.length;
    for(let i = 0; i < size ; i++){
      url = url.concat("id=" + ids[i] + '&');
    }
    return this.http.get<Pageable>(`${API}?size=${size}&${url}`)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  update(id: string, evento: EventoForm): Observable<Evento> {
    return this.http.put(`${API}/${id}`, evento)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  saveFoto(id:string, tipo: string, foto: FormData) {
    return this.http.post(`${API}/${id}/fotos/${tipo}`, foto)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  private handleError(e: any): Observable<any>{
    console.log(e);
    this.showMessage('Ocorreu um erro.');
    return EMPTY;
  }

  showMessage(msg?: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    })
  }
}
