import { Router } from '@angular/router';
import { CompraService } from './../core/compra/compra.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Evento } from './../core/evento/evento.model';
import { EventoService } from './../core/evento/evento.service';
import { HeaderService } from './../core/template/header/header.service';
import { CarrinhoService } from './../core/carrinho/carrinho.service';
import { Component, OnInit, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Eventos {
  total?: number;
  eventos: Map<Evento, number>;
}

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  private _carrinho = new Map<string, number>();
  private _eventos: Evento[] = [];
  private loadingSubject = new BehaviorSubject<boolean>(false);
  eventos: Map<Evento, number> = new Map<Evento, number>();
  loading$ = this.loadingSubject.asObservable();
  total: number = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private eventoService: EventoService,
    private compraService: CompraService,
    private router: Router,
    private matDialog: MatDialog,
    headerService: HeaderService) {
      headerService.headerData = {
        title: 'Carrinho',
        icon: 'shopping_cart',
        routerUrl: '/carrinho'
      }
     }
     
  ngOnInit(): void {
    this.loadingSubject.next(true);
    this.carrinhoService.total$.subscribe( total => {
      if(total > 0){
        this.createCarrinho();
        this.loadingSubject.next(false);
      } else {
        this.eventos = null;
        this.loadingSubject.next(false);
      }
    })
  }

  private createCarrinho() {
    this.eventoService.getAllById(this.getIdsFromCarrinho())
      .subscribe(res => {
        this._eventos = res.content
        this.syncEventoQtd();
      });
  }

  private getIdsFromCarrinho() {
    this._carrinho = this.carrinhoService.getItemsFromCarrinho();
    var ids: string[] = [];
    for(let key of this._carrinho.keys()){
      ids.push(key);
    }
    return ids;
  }

  private syncEventoQtd() {
    this.eventos = new Map<Evento, number>();
    this.total = 0;
    for(let evento of this._eventos) {
      var id: string = evento.id;
      var qtd: number = +this._carrinho.get(id.toString());
      this.eventos.set(evento, qtd);
      this.total += +evento.preco * qtd;
    }
  }

  comprar() {
    this.openDialog(this.eventos, this.total);
  }

  private openDialog(eventos: Map<Evento, number>, total: number) {
    const dialogRef = this.matDialog.open(CarrinhoDialog, {
      width: '600px',
      data: { eventos: eventos, total: total}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "true") {
        this.compraService.save(this._carrinho)
          .subscribe(() => {
            this.compraService.showMessage('Compra efetuada!')
            this.router.navigate(['/eventos']);
            this.carrinhoService.removeAll();
          })

      }
    });
  }
}

@Component({
  selector: 'prime-carrinho-dialog',
  templateUrl: 'dialog-carrinho.html',
})
export class CarrinhoDialog {

  constructor(
    public dialogRef: MatDialogRef<CarrinhoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Eventos){}
}
