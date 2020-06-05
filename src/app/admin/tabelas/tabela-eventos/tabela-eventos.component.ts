import { AdminService } from './../../../core/admin/admin.service';
import { tap } from 'rxjs/operators';
import { EventoService } from './../../../core/evento/evento.service';
import { TabelaEventoDataSource } from './tabela-eventos-datasource';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'prime-tabela-eventos',
  templateUrl: './tabela-eventos.component.html',
  styleUrls: ['./tabela-eventos.component.css']
})
export class TabelaEventosComponent implements OnInit, AfterViewInit {

  dataSource: TabelaEventoDataSource;
  totalElements: number = 0;
  displayedColumns = ['id', 'nome','ingressosDisponiveis', 'ingressosVendidos', 'casaDeShow', 'status', 'action'];
  hide = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private eventoService: EventoService,
    private adminService: AdminService) { }
  
  ngOnInit(): void {
    this.dataSource = new TabelaEventoDataSource(this.eventoService);
    this.dataSource.loadEventos(0);
    
  }
  
  ngAfterViewInit(): void {
    this.paginator.page
      .pipe( tap( () => this.loadEventosPage()))
      .subscribe();

      this.adminService.loadEventos
      .subscribe(value => {
        value && this.loadEventosPage(); 
      });
  }

  loadEventosPage() {
    console.log('executando')
    this.dataSource.loadEventos(this.paginator.pageIndex)
  }

  ocultar(id: number, status: string) {
    if(status == 'ABERTO'){
      this.eventoService.ocultar(id, 'OCULTO').subscribe(() => {
        this.eventoService.showMessage(`Evento#${id} Ocultado`);
        this.loadEventosPage();
      },
      err => {
        this.eventoService.showMessage('Ocorreu um erro');
        console.log(err);  
      });
    }else if(status == 'OCULTO'){
      this.eventoService.ocultar(id, 'ABERTO').subscribe(() => {
        this.eventoService.showMessage(`Evento#${id} está ABERTO`);
        this.loadEventosPage();
      },
      err => {
        this.eventoService.showMessage('Ocorreu um erro');
        console.log(err);  
      });
    }
  }
}
