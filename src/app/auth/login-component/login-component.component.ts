import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent  {

  error: boolean = false;
  loginUser: FormGroup | null ;

  constructor(private loginS: LoginServiceService, private router: Router, private fb: FormBuilder){
    this.inicializarForm();
  }

  private inicializarForm(){
    this.loginUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  loginForm(): void {
    if(this.loginUser.valid){
      this.loginS.loginForm(this.loginUser.value).then(
        () => {
          this.router.navigate(['home']);
          this.loginUser.reset();
        },
        () => {
          this.error = true;
        }
      );
    } else {
      Object.keys(this.loginUser.controls).forEach(key => {
        const control = this.loginUser.get[key];
        control.markAsTouched();
      })
    }
  }

}
