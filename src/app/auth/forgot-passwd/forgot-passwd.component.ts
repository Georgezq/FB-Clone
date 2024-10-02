import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from 'src/app/core/utils/FormValidators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-passwd',
  templateUrl: './forgot-passwd.component.html',
  styleUrls: ['./forgot-passwd.component.css']
})
export class ForgotPasswdComponent {

  error: boolean = false;
  loginUser: FormGroup | null ;

  constructor(private fb: FormBuilder, private formValid: FormValidators, private AuthService: AuthService) { 

   this.inicializarForm();
  }

  private inicializarForm(){
    this.loginUser = this.fb.group({
      email: new FormControl('', [Validators.required, this.formValid.customeEmailValidator, Validators.email]),
    });
  }

  resetForm(){
    this.AuthService.sendEmailToResetPassword(this.loginUser.value).then(() => {
      
    }).catch(() => {
      this.error = true
    })
  }

}
