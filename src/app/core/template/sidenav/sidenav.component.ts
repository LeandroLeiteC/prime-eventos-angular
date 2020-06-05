import { Router } from '@angular/router';
import { UserService } from './../../user/user.service';
import { User } from './../../user/user.model';
import { SidenavService } from './sidenav.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'prime-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isVisible: boolean = true;
  isAdmin: boolean = false;
  user$: Observable<User>
  innerWidth: any;

  @HostListener('window:resize', ['$event']) 
    onResize(event) {
      this.innerWidth = window.innerWidth;
    }

  constructor(
    private sidenavService: SidenavService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.sidenavService.sidebarVisibility.subscribe(isVisible => this.isVisible = isVisible);
    this.user$ = this.userService.getUser();
    this.innerWidth = window.innerWidth;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
