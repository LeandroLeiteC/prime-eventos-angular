import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if( this.userService.isLogged() ) {
      if( this.userService.isAdmin() ) {
        return true;
      }else {
        this.showMessage('Acesso negado!');
        this.redirect();
        return false;
      }
    }else {
      this.showMessage('Acesso negado!');
      this.redirect();
      return false;
    }
  }

redirect() {
  this.router.navigate(['/']);
}

showMessage(msg?: string): void {
  this.snackBar.open(msg, 'X', {
    duration: 3000,
    horizontalPosition: "right",
    verticalPosition: "bottom",
  })
}
  
}
