import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent {

  addStoryWithText: boolean = false;
  addStoryWithImage: boolean = false;

  nombre: string = '';
  foto: string = '';
  apellidos: string = '';

  seeAddStoryWithText(){
    this.addStoryWithText = true;
  }

  
  constructor(private authService: AuthService){}

  async ngOnInit() {
    this.obtenerDatosUsuarioLogueado();
  }

  private obtenerDatosUsuarioLogueado(){
    this.authService.getUserLogged().subscribe((user: any) => {
      this.nombre = user.nombre;
      this.foto = user.foto;
      this.apellidos = user.apellido;
      
    })
  }

}
