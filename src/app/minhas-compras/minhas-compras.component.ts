import { HeaderService } from './../core/template/header/header.service';
import { Compra } from './../core/compra/compra.model';
import { CompraService } from './../core/compra/compra.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minhas-compras',
  templateUrl: './minhas-compras.component.html',
  styleUrls: ['./minhas-compras.component.css']
})
export class MinhasComprasComponent implements OnInit {

  compras: Compra[] = [];

  constructor(
    private compraService: CompraService,
    headerService: HeaderService) {
      headerService.headerData = {
        title: 'Minhas Compras',
        icon: 'local_mall',
        routerUrl: '/minhas-compras'
      }
     }

  ngOnInit(): void {
    this.compraService.getAll().subscribe(
      res => {
        if(res.content.length > 0){
          this.compras = res.content;
        } else {
          this.compras = null;
        }
      }
    );
  }

}
