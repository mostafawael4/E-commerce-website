
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpService } from '../../../services/authentication/sign-up.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z]{3,20}$/),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{2,20}[0-9]{0,10}@gmail.com$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
      rePassword: new FormControl(null, Validators.required),
    },
    this.passwordMatch
  );

  passwordMatch(g: AbstractControl): { [key: string]: boolean } | null {
    if (g.get('password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
  constructor(private _SignUpService: SignUpService, private _Router: Router) {}
  message!: string;
  flag!: boolean;
  isLoading:boolean = false;
  submitForm() {
    this.isLoading = true;
    this._SignUpService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.message = 'account have been created successfully';
        console.log(res);
        this.flag = false;
        this.isLoading = false;
        this._Router.navigate(['/login']);
        
      },
      error: (res) => {
        this.message = 'user name or Email are exist already';
        this.isLoading = false;
        console.log(res);
        this.flag = true;
      },
    });
  }
}
