import { CarrinhoService } from './../../core/carrinho/carrinho.service';
import { Evento } from './../../core/evento/evento.model';
import { EventoService } from './../../core/evento/evento.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

const API = "http://localhost:8080/api/images";

@Component({
  selector: 'app-detalhe-evento',
  templateUrl: './detalhe-evento.component.html',
  styleUrls: ['./detalhe-evento.component.css']
})
export class DetalheEventoComponent implements OnInit {

  id: string;
  evento: Evento;
  urlBanner: string;
  urlCard: string;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.eventoService.getById(this.id).subscribe( res => {
      this.evento = res;
      if(res.nomeImagemBanner == null){
        this.urlBanner = '/assets/img/banner.jpg';
      }else {
        this.urlBanner = `${API}/${res.nomeImagemBanner}`; 
      }
      if(this.evento.nomeImagemCard == null){
        this.urlCard = '/assets/img/card.jpg';
      }else {
        this.urlCard = `${API}/${this.evento.nomeImagemCard}`; 
      }
    });
  }

  adicionar(id: string, limite: number, disp: number){
    this.carrinhoService.addOneItemToCarrinho(id, limite, disp);
  }

}
