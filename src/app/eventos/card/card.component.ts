import { Evento } from './../../core/evento/evento.model';
import { Component, OnInit, Input } from '@angular/core';

const API = "http://localhost:8080/api/images";

@Component({
  selector: 'prime-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() evento: Evento = null;
  url: string;

  constructor() { }

  ngOnInit(): void {
    if(this.evento.nomeImagemCard == null){
      this.url = '/assets/img/card.jpg';
    }else {
      this.url = `${API}/${this.evento.nomeImagemCard}`; 
    }
  }

}
