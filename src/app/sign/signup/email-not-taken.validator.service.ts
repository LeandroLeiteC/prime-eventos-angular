import { SignupService } from './signup.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailNotTakenValidatorService {

  constructor(private signupService: SignupService) { }

  checkEmailTaken() {
    return (control: AbstractControl) => {
      return control.valueChanges
        .pipe(debounceTime(300))
        .pipe(switchMap(email => this.signupService.checkEmailTaken(email)))
        .pipe(map(isTaken => isTaken ? {emailTaken: true} : null))
        .pipe(first());
    }
  }

}
