import { code } from './../../../interface/authentication/register-data';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpService } from '../../../services/authentication/sign-up.service';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
@Component({
  selector: 'app-code-form',
  standalone: true,
  imports: [ReactiveFormsModule , ResetpasswordComponent],
  templateUrl: './code-form.component.html',
  styleUrl: './code-form.component.scss',
})
export class CodeFormComponent {
  flag!: boolean;
  isLoading: boolean = false;
  message!: string;
  resetFlag : boolean = false;
  codeFlag : boolean = true;
  constructor(private _SignUpService: SignUpService) {}

  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, Validators.required),
  });

  submit() {
    this.isLoading = true;
    this._SignUpService
      .codeSend(this.codeForm.value)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          this.flag = false;
          this.message = res.message;
          this.resetFlag = true;
          this.codeFlag = false;
        },
        error: (res) => {
          this.isLoading = false;
          console.log(res.message);
          this.flag = true;
          this.message = res.error.message;
        },
      });
  }
}
