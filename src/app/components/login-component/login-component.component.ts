import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private loginS: LoginServiceService){}

  ngOnInit(): void {
   this.loginS.getUser().subscribe(
      (res => {
        console.log(res);
      })
    );


  }

  loginForm(form: NgForm){
  }

}
