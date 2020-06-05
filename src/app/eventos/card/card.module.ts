import { AppRoutingModule } from './../../app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card'
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ CardComponent ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    AppRoutingModule
  ],
  exports: [ CardComponent ]
})
export class CardModule { }
