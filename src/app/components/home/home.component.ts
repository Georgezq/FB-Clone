import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users/users';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLogged: Users;
  nombre: string = '';
  foto: string = '';

  loading: boolean = false;

  constructor(private authService: AuthService){}

  async ngOnInit() {
    this.authService.getUserLogged().subscribe((user: any) => {
      this.nombre = user.nombre;
      this.foto = user.foto;

      this.loading = true;
    })
  }
}
