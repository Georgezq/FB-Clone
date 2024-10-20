import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap } from 'rxjs';
import { Publication, PublicationComments } from 'src/app/models/publicaciones';
import { Users } from 'src/app/models/users/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PublicationService } from 'src/app/services/publication/publication.service';

@Component({
  selector: 'app-main-publicaciones',
  templateUrl: './main-publicaciones.component.html',
  styleUrls: ['./main-publicaciones.component.css']
})
export class MainPublicacionesComponent implements OnInit{

  @Input() userName: string = '';
  @Input() userPhoto: string = '';
  @Input() loading: boolean = false;
  loadingPublicaciones: boolean = false;
  // @Input() publications: any[] = [];
  contenidoPublicacion: Publication[];
  usuarioPublicacion: Users[];
  commentControl = new FormControl('');
  comentarios: { [key: string]: PublicationComments[] } = {}; // Almacenar los comentarios por publicación  

  constructor(private publicacionesService: PublicationService) { 
  }
  
  
  ngOnInit(): void {
    this.getPublicaciones();
  }

  getPublicaciones() {
    this.publicacionesService.getPublicationsWithUser().subscribe((publicaciones: Publication[]) => {
      this.contenidoPublicacion = publicaciones;
      
      // Para cada publicación, obtener sus comentarios
      this.contenidoPublicacion.forEach(pub => {
        this.publicacionesService.getPubCommentWithUser(pub.id).subscribe((comments: PublicationComments[]) => {
          this.comentarios[pub.id] = comments; // Asociar los comentarios con el ID de la publicación
          
        });
      });
      
      // Simulación de carga
      setTimeout(() => {
        this.loadingPublicaciones = true;
      }, 1000);
    });
  }

  sendComment(id: any){
    if(this.commentControl.value){
      this.publicacionesService.addCommentToPub(id, this.commentControl.value).subscribe();
      this.commentControl.setValue('');
    }
  }


}
