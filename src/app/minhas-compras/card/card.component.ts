import { BehaviorSubject } from 'rxjs';
import { CompraEvento } from './../../core/compra/compra-evento.model';
import { Component, OnInit, Input } from '@angular/core';

const API ="http://localhost:8080/api/images";

@Component({
  selector: 'prime-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() compraEvento: CompraEvento;
  url: string = "/assets/img/card.jpg";
  constructor() { }

  ngOnInit(): void {
    let card: string = this.compraEvento.evento.nomeImagemCard;
    if(!!card){
      this.url = `${API}/${card}`;
    }
  }

}
