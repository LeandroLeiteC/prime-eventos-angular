import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { windowWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  carrinho = new Map<string, number>();
  total: number = 0;
  total$ = new BehaviorSubject<number>(this.total);
  constructor(
    private snackBar: MatSnackBar) { }
  
  addOneItemToCarrinho(id: string, limite: number, disp: number) {
    var qtd = +window.localStorage.getItem("evento#" + id)
    if(qtd == 0){
      window.localStorage.setItem("evento#" + id, "1");
      this.showMessage('Adicionado ao carrinho')
    }else {
      if(qtd < limite && qtd < disp){
        qtd++;
        window.localStorage.setItem("evento#" + id, qtd.toString());
      }else {
        this.showMessage("Limite de ingressos atingido")
      }
    }
    
    this.countItems();
  }

  removeOneItemFromCarrinho(id: string) {
    var qtd = +window.localStorage.getItem("evento#" + id);
    if( qtd > 1){
      qtd--;
    }
    window.localStorage.setItem("evento#" +id, qtd.toString());
    this.countItems();
  }

  removeItemFromCarrinho(id: string) {
    window.localStorage.removeItem('evento#' + id);
    this.countItems();
    this.showMessage('Removido do carrinho');
  }

  getItemsFromCarrinho(){
    this.carrinho.clear();
    var total = window.localStorage.length;
    for(let i = 0; i < total; i++ ){
      var evento: string = window.localStorage.key(i);
      if(evento.includes("evento#")){
        var qtd: number = +window.localStorage.getItem(evento);
        var id = evento.split('#')[1]
        this.carrinho.set(id, qtd);
      }
    }
    return this.carrinho;
  }

  removeAll(){
    var len = window.localStorage.length;
    let keys: string[] = [];
    for(let i = 0; i < len; i++) {
      let key = window.localStorage.key(i);
      if(key != "authToken"){
        keys.push(key);
      }
    }
    for(let k of keys){
      window.localStorage.removeItem(k);
    }
    this.countItems();
  }

  countItems() {
    this.getItemsFromCarrinho();
    this.total = this.carrinho.size;
    this.total$.next(this.total);
  }

  showMessage(msg?: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    })
  }
}
