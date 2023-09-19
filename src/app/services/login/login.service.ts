import { Injectable, Output } from '@angular/core';
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
  private authToken: string;

  getUser(): Observable<any>{

    return this.httpClient.get(`${this.API}/users`).pipe(
      tap(res => {
        if(!res){
          console.log('Something is wrong, be careful!');
        }
      })
    )

  }

  loginForm(user: Users) {
    return this.httpClient.post(`${this.API}/login`, user).pipe(
      tap((data: any) => {
        // Simulación de inicio de sesión exitoso

          this.authToken = data.token; // Almacena el token en el cliente
          localStorage.setItem('nombreUsuario', user.nombre); // Almacena el nombre en el localStorage
          localStorage.setItem('foto', data.foto);
          localStorage.setItem('id', data.id_user);

      })
    );
  }
}
