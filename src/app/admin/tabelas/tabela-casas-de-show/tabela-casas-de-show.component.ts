import { Evento } from './../../../core/evento/evento.model';
import { AdminService } from './../../../core/admin/admin.service';
import { CasaDeShowService } from './../../../core/casa-de-show/casa-de-show.service';
import { tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { TabelaCasasDeShowDataSource } from './tabela-casas-de-show-datasource';
import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface CasaDeShowId {
  id: string;
  status: string;
  eventos: Evento[];
}

@Component({
  selector: 'prime-tabela-casas-de-show',
  templateUrl: './tabela-casas-de-show.component.html',
  styleUrls: ['./tabela-casas-de-show.component.css']
})
export class TabelaCasasDeShowComponent implements OnInit, AfterViewInit {

  dataSource: TabelaCasasDeShowDataSource;
  totalElements: number = 0;
  displayedColumns = ['id', 'nome','limitePessoas', 'localizacao', 'telefone', 'status', 'action'];
  hide = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private casaDeShowService: CasaDeShowService,
    private matDialog: MatDialog) { }
    
  ngOnInit(): void {
    this.dataSource = new TabelaCasasDeShowDataSource(this.casaDeShowService);
    this.dataSource.loadCasasDeShow(0);
  }

  ngAfterViewInit(): void {
     this.paginator.page
      .pipe( tap( () => this.loadCasasDeShowPage()))
      .subscribe();
  }

  loadCasasDeShowPage() {
    this.dataSource.loadCasasDeShow(this.paginator.pageIndex)
  }

  deletar(id: string, status: string){
    this.casaDeShowService.getAllEventos(id).subscribe( res => {
      this.openDialog(id, status, res);
    });
  }

  private openDialog(id: string, status: string, eventos: Evento[]) {
    const dialogRef = this.matDialog.open(DialogDelete, {
      width: '600px',
      data: { id : id, status: status, eventos: eventos }
  });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.loadCasasDeShowPage();
      }
    });
  }

  ocultar(id: string, status: string){
    const st = (status=="ABERTO") ? "OCULTO" : "ABERTO";
    this.casaDeShowService.ocultar(id, st )
      .subscribe(() => {
        this.casaDeShowService.showMessage(`EVENTO#${id} está ${st}`);
        this.loadCasasDeShowPage();
      });
  }
}

@Component({
  selector: 'prime-deletar-dialog',
  templateUrl: 'dialog-delete.html',
})
export class DialogDelete {

  constructor(
    public dialogRef: MatDialogRef<DialogDelete>,
    @Inject(MAT_DIALOG_DATA) public data: CasaDeShowId,
    private casaDeShowService: CasaDeShowService,
    private adminService: AdminService){}
  
    ocultar(){
      const status = (this.data.status=="ABERTO") ? "OCULTO" : "ABERTO";
      this.casaDeShowService.ocultar(this.data.id, status )
        .subscribe(() => this.casaDeShowService.showMessage(`Casa de Show #${this.data.id} está ${status}`));
      this.dialogRef.close(true);
    }

    deletar() {
      this.casaDeShowService.delete(this.data.id)
        .subscribe( () => {
          this.casaDeShowService.showMessage('Casa de Show deletada.');
          this.adminService.ReloadEventos(true);
          this.dialogRef.close(true);
        });
    }
}
