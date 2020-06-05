import { CarrinhoService } from './../../carrinho/carrinho.service';
import { UserService } from './../../user/user.service';
import { User } from './../../user/user.model';
import { SidenavService } from './../sidenav/sidenav.service';
import { HeaderService } from './header.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'prime-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$: Observable<User>
  items = 5;
  innerWidth: any;


  constructor(
    private headerService: HeaderService,
    private sidenavService: SidenavService,
    private userService: UserService,
    private carrinhoService: CarrinhoService,
    private router: Router) {
      this.user$ = this.userService.getUser();
     }

  ngOnInit(): void {
    this.carrinhoService.countItems();
    this.carrinhoService.total$.subscribe(items => this.items = items);
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event']) 
    onResize(event) {
      this.innerWidth = window.innerWidth;
    }

  get title(): string {
    return this.headerService.headerData.title;
  }

  get icon(): string {
    return this.headerService.headerData.icon;
  }

  get routerUrl(): string {
    return this.headerService.headerData.routerUrl;
  }

  hideSideNav(){
    this.sidenavService.toggleSidebarVisibility();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
