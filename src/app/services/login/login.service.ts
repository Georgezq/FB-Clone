import { Injectable } from '@angular/core';
import { environment  } from 'src/enviroments';
import { Users } from 'src/app/models/users/users';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpClient: HttpClient) { }

  API = environment.apiUrl;

  getUser(): Observable<any>{

    return this.httpClient.get(`${this.API}/users`).pipe(
      tap(res => {
        if(!res){
          console.log('Something is wrong, be careful!');
        }
      })
    )

  }

  loginForm(user: Users): Observable<any>{
    return this.httpClient.post(`${this.API}/login`, user).pipe(
      tap(res => {
        if(!res){
          console.log(res);
        }
      })
    )
  }
}
