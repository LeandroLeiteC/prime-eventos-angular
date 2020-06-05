import { CarrinhoService } from './../../core/carrinho/carrinho.service';
import { Evento } from './../../core/evento/evento.model';
import { Component, OnInit, Input } from '@angular/core';

const API = "http://localhost:8080/api/images";

@Component({
  selector: 'prime-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() evento: Evento;
  @Input() quantidade: number;
  url: string;
  preco: number;
  constructor(
    private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    if(this.evento.nomeImagemCard == null){
      this.url = '/assets/img/card.jpg';
    }else {
      this.url = `${API}/${this.evento.nomeImagemCard}`; 
    }
    this.preco = +this.evento.preco;
  }
  add(id: string, limite: number, disp: number){
    this.carrinhoService.addOneItemToCarrinho(id, limite, disp);
  }

  sub(id: string){
    this.carrinhoService.removeOneItemFromCarrinho(id);
  }

  remover(id: string) {
    this.carrinhoService.removeItemFromCarrinho(id);
  }
}
