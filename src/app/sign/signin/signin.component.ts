import { HeaderService } from './../../core/template/header/header.service';
import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'prime-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  hide: boolean = true;
  loginForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    headerService: HeaderService,
    formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {

      headerService.headerData = {
        title: 'Login',
        icon: 'assignment_ind',
        routerUrl: '/entrar'
      };

      this.loginForm = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
  }

  login(){
    const email = this.loginForm.get("email").value;
    const password = this.loginForm.get("password").value;

    this.authService.authenticate(email, password)
      .subscribe( () => this.router.navigate(['/']),
      err => {
        this.authService.showMessage("Email ou senha inválido");
        this.loginForm.reset();
        this.emailInput.nativeElement.focus();
      });
  }
}
