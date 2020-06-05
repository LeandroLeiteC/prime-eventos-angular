import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CardModule } from './../card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent, CancelarDialog } from './panel.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [ PanelComponent, CancelarDialog],
  imports: [
    CommonModule,
    MatExpansionModule,
    CardModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ PanelComponent ]
})
export class PanelModule { }
