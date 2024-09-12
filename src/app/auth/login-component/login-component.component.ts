import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { LoginServiceService } from 'src/app/services/login/login.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  error: boolean = false;

  constructor(private loginS: LoginServiceService, private router: Router, private location: Location){}

  ngOnInit(): void {

  }



  loginForm(form: NgForm): void {
    // if (form.valid) {
    //   this.loginS.loginForm(form.value).subscribe(
    //     (data) => {
    //       this.router.navigateByUrl('/home');
    //     },
    //     (error) => {
    //       this.error = true;
    //     }
    //   );
    // }
  }

}
