import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Users } from 'src/app/models/users/users';
import { environment } from 'src/enviroments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Users[] = [];
  authService: string = '';
  usuarioLogged: string = '';


  constructor(private httpClient: HttpClient) { }

  API_URL1 = environment.apiUrl;

  getUsers(){
    return this.httpClient.get(`${this.API_URL1}/users`)
  }

  setUser(user: Users[]){
    return this.users = user;
  }

  addUser(user: Users) {
    return this.httpClient.post(`${this.API_URL1}/users`, user);
  }


  updateUsers(index: number, user: Users) {
    this.users[index].nombre = user.nombre;
    this.users[index].password = user.password;


    const id_user = user.id_user;
    this.httpClient.put(`${this.API_URL1}/users/${id_user}`, user).subscribe(
      () => {

      },
      (error) => {

      }
    );
  }

  deleteUser(index: number){
    this.httpClient.delete(`${this.API_URL1}/users/${index}`,).subscribe(
      (res) => {
        console.log(`Resultado de eliminar usuario: ${res}`);
      }
    )
  }
}
