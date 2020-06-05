import { UserForm } from './userForm.model';
import { EmailNotTakenValidatorService } from './email-not-taken.validator.service';
import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'prime-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide: boolean = true;
  cadastroForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;
  @Input() isAdmin: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private emailNotTakenValidatorService: EmailNotTakenValidatorService) {
      this.cadastroForm = formBuilder.group({
        nome:['', [Validators.required]],
        email:['', [Validators.required, Validators.email], this.emailNotTakenValidatorService.checkEmailTaken()],
        password: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {
  }

  cadastrar() {
    const user: UserForm = this.cadastroForm.getRawValue();
    if(this.isAdmin){
      this.authService.cadastrarAdmin(user).subscribe( () => {
        this.authService.showMessage("Novo Admin cadastrado");},
        err => {
          this.authService.showMessage("Ocorreu um erro");
          this.cadastroForm.reset();
          this.emailInput.nativeElement.focus();
        })
    } else {
      this.authService.cadastrar(user).subscribe( () => {
        this.authService.showMessage("Conta cadastrada!");
        this.router.navigate(['/login']),
        err => {
          this.authService.showMessage("Ocorreu um erro");
          this.cadastroForm.reset();
          this.emailInput.nativeElement.focus();
        }
      });
    }
    
  }

  cadastrarAdmin() {

  }

}
