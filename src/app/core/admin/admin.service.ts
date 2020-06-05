import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  selectedTab = 0;
  selected = new BehaviorSubject<number>(0);
  loadEventos = new BehaviorSubject<boolean>(false);

  constructor() { }

  changeTab(tab: number) {
    this.selectedTab = tab;
    this.selected.next(this.selectedTab);
  }

  ReloadEventos(value: boolean){
    this.loadEventos.next(value);
  }

}
