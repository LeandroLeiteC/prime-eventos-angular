import { environment } from './../../../environments/environment';
import { Evento } from './../evento/evento.model';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '../model/pageable.mode';
import { CasaDeShow } from './casa-de-show.model';

const API = environment.apiUrl + '/casasdeshow';

@Injectable({
  providedIn: 'root'
})
export class CasaDeShowService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  getAll(page: number = 0, status: string = 'aberto'): Observable<Pageable> {
    return this.http.get<Pageable>(`${API}?page=${page}&status=${status}`)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  save(casaDeShow: CasaDeShow): Observable<CasaDeShow> {
    return this.http.post<CasaDeShow>(API, casaDeShow )
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  getById(id: string): Observable<CasaDeShow> {
    return this.http.get<CasaDeShow>(`${API}/${id}`)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  update(casaDeShow: CasaDeShow, id: string) {
    return this.http.put(`${API}/${id}`, casaDeShow)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  ocultar(id: string, status: string): Observable<any>{
    return this.http.patch(`${API}/${id}`, null, { params: {status}})
      .pipe(
      map( (obj) => obj),
      catchError(e => this.handleError(e))
      );
  }

  delete(id: string) {
    return this.http.delete(`${API}/${id}`)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  getAllEventos(id: string): Observable<Evento[]> {
    return this.http.get(`${API}/${id}/eventos`)
      .pipe(
        map( (obj) => obj),
        catchError(e => this.handleError(e))
      );
  }

  handleError(e: any): Observable<any>{
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
