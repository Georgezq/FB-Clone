import { Component, Input, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publicaciones';
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

  constructor(private publicacionesService: PublicationService, private auth: AuthService) { 
    this.getPublicaciones()
   }


  ngOnInit(): void {
  }

  getPublicaciones(){ 
    this.publicacionesService.getPublicationsWithUser().subscribe((publicaciones: Publication[]) => {
      this.contenidoPublicacion = publicaciones;
      
      setTimeout(() => {
        this.loadingPublicaciones = true
      }, 1000);
    });  
  }

}
