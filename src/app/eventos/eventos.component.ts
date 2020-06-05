import { HeaderService } from './../core/template/header/header.service';
import { EventoService } from './../core/evento/evento.service';
import { Evento } from '../core/evento/evento.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'prime-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: Evento[] = [];
  page: number = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private eventoService: EventoService,
    headerService: HeaderService) {
      headerService.headerData = {
        title: 'Eventos',
        icon: 'storefront',
        routerUrl: '/eventos'
      }
     }

  ngOnInit(): void {
    this.loadingSubject.next(true);
    this.getAll();
  }

  onScroll() {
    this.getAll();
  }

  getAll() {
    this.eventoService.getAll(this.page, 'aberto')
      .subscribe( res => {
        if(res.content.length > 0 || this.eventos.length > 0){
          this.eventos = this.eventos.concat(res.content);
          this.loadingSubject.next(false);
        } else {
          this.eventos = null;
          this.loadingSubject.next(false);
        }
       
      },
        err => { 
          this.eventoService.showMessage('Ocorreu um erro.');
          console.log(err)
        } 
      );
    this.page += 1;
  }

}
