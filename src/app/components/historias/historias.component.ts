import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Historias } from 'src/app/models/historias';
import { Users } from 'src/app/models/users/users';
import { StoryUserService } from 'src/app/services/user/story-user.service';
import { UsersService } from 'src/app/services/user/users.service';


@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.css']
})
export class HistoriasComponent implements OnInit{

  user: Users[] = [];

  historias: Historias[] = [];
  showHistoria: Historias[] = [];
  aaa: Historias[] = [];
  @ViewChild('myModal') myModal: ElementRef;




  userlogged;
  imguser;
  id_usuario: number = 0;

  newStory: Historias = {

    contenidoTexto: '',
    contenidoMedia: '',
    id_usuario: this.id_usuario,
  }

  isModalOpen: boolean = false;
  selectedUserId: number | null = null; // Nuevo: seguimiento del usuario seleccionado para el modal



  constructor(private userService: UsersService, private storyService: StoryUserService, private renderer: Renderer2){

  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe((
      user: Users[]) => {
        this.user = user;
        this.userService.setUser(user);
      }
    );


    this.storyService.getHistorias().subscribe((historia: Historias[]) => {
      this.historias = historia;
      this.storyService.setHistorias(historia);

      // Crea una copia independiente de historias para showHistoria
      this.showHistoria = historia;
      this.aaa = historia;

      // Procesa las historias para obtener solo una por usuario
      this.procesarHistoriasUnicas();
    });



    this.userlogged = localStorage.getItem('nombreUsuario');
    this.imguser = localStorage.getItem('foto');
    this.id_usuario = parseInt(localStorage.getItem('id'));


  }

  procesarHistoriasUnicas() {
    const historiasUnicasPorUsuario: Map<number, boolean> = new Map<number, boolean>();
    const historiasUnicas: Historias[] = [];

    this.historias.forEach(story => {
      const userId = story.id_usuario;
      if (!historiasUnicasPorUsuario.has(userId)) {
        historiasUnicasPorUsuario.set(userId, true);
        historiasUnicas.push(story); // Agrega la historia única a la nueva lista
      }
    });

    // Ahora, asigna la nueva lista de historias únicas a this.historias
    this.historias = historiasUnicas;
  }

  // Método para obtener la foto del usuario en función de la id_usuario
getUsuarioFoto(idUsuario: number): string {
  if (!this.user) {
    return ''; // Puedes manejar el caso en que usuarios aún no se ha cargado
  }

  const usuario = this.user.find(user => user.id_user === idUsuario);

  if (!usuario) {
    return ''; // Puedes manejar el caso en que no se encuentra el usuario
  }

  return usuario.foto;
}

getUsuarioNombre(idUsuario: number): string {
  if (!this.user) {
    return ''; // Puedes manejar el caso en que usuarios aún no se ha cargado
  }

  const usuario = this.user.find(user => user.id_user === idUsuario);

  if (!usuario) {
    return '';
  }

  return usuario.nombre;
}

isImageLink(link: string): boolean {
  return link.includes('.jpg');
}

isVideoLink(link: string): boolean {
  return link.includes('.mp4');
}


  storyForm(form: NgForm){

    const hola = form.value
    console.log(hola)

    if(form.valid){

      this.storyService.addStory(form.value).subscribe(
        (res) => {
          console.log(res)
          // Cierra el formulario
          this.renderer.setStyle(this.myModal.nativeElement, 'display', 'none');
          form.resetForm();
        }
      )
    }



  }

  openModal(id_usuario: number) {
    this.isModalOpen = true;
    // Filtrar las historias solo para el usuario seleccionado
    this.showHistoria = this.aaa.filter(story => story.id_usuario === id_usuario);
    console.log(this.showHistoria)
  }


  closeModal(id_usuario: number) {
    // Filtra las historias para quitar las del usuario específico
    this.isModalOpen = false;
    this.showHistoria = this.showHistoria.filter(story => story.id_usuario !== id_usuario);
  }

}
