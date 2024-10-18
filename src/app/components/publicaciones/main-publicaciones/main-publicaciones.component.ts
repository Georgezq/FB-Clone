import { Component, Input, OnInit } from '@angular/core';
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
  // @Input() publications: any[] = [];
  contenidoPublicacion: any[];

  constructor(private publicacionesService: PublicationService, private auth: AuthService) { }


  ngOnInit(): void {
    this.getPublicaciones()
  }

  getPublicaciones(){ 
    this.loading = true;
    this.publicacionesService.getPubications().subscribe((publicaciones: any[]) => {
      publicaciones.forEach((item:any) => {
        this.auth.getUsersSelectedById(item.autor).subscribe(user => {          
        })
        // this.contenidoPublicacion = item.contenido
      })
      
      this.loading = false;
    });  
  }

}
