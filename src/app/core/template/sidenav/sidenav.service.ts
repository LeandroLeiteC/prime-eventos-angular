import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  isVisible: boolean = true;
  sidebarVisibility: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isVisible);

  constructor() {
  }

  toggleSidebarVisibility() {
    this.isVisible = !this.isVisible;
    this.sidebarVisibility.next(this.isVisible);
  }
}
