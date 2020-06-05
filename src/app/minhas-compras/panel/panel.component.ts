import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CompraService } from './../../core/compra/compra.service';
import { CompraEvento } from './../../core/compra/compra-evento.model';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Compra } from 'src/app/core/compra/compra.model';


export interface Cancelar {
  compra: Compra;
  compraEventos: CompraEvento[];
}

@Component({
  selector: 'prime-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  @Input() compra: Compra;
  @Input() panelId: number;
  compraEventos: CompraEvento[] = [];
  opened: boolean;

  constructor(
    private compraService: CompraService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  pegarCompraEventos(id: string) {
    this.compraService.getCompraEventos(id)
      .subscribe( res => this.compraEventos = res);
  }

  cancelar(id: string) {
    this.openDialog(this.compra, this.compraEventos);
  }

  private openDialog(compra: Compra, ce: CompraEvento[]) {
    const dialogRef = this.matDialog.open(CancelarDialog, {
      width: '500px',
      data: { compra: compra, compraEventos: ce }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(compra.id == result) {
        compra.statusCompra = "CANCELADO";
      }
    });
  }
  
}

@Component({
  selector: 'prime-cancelar-dialog',
  templateUrl: 'dialog-cancelar.html',
})
export class CancelarDialog {

  constructor(
    public dialogRef: MatDialogRef<CancelarDialog>,
    private compraService: CompraService,
    @Inject(MAT_DIALOG_DATA) public data: Cancelar){}

  cancelar(id: string) {
    this.dialogRef.close();
    this.compraService.cancelar(id).subscribe(() => this.dialogRef.close(id))
  }
}
