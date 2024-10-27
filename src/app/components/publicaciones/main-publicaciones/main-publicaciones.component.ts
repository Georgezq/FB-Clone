import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Publication, PublicationComments } from 'src/app/models/publicaciones';
import { Users } from 'src/app/models/users/users';
import { PublicationService } from 'src/app/services/publication/publication.service';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-main-publicaciones',
  templateUrl: './main-publicaciones.component.html',
  styleUrls: ['./main-publicaciones.component.css']
})
export class MainPublicacionesComponent {

  @Input() userName: string = '';
  @Input() userPhoto: string = '';
  @Input() lastName: string = '';
  @Input() loading: boolean = false;
  @Input() userId: string = '';
  loadingPublicaciones: boolean = false;
  contenidoPublicacion: Publication[];
  usuarioPublicacion: Users[];
  commentControl = new FormControl('');
  comentarios: { [key: string]: PublicationComments[] } = {}; // Almacenar los comentarios por publicación  
  activeDropdownId: string | null = null;
  modalOpen: boolean = false;
  editingData: any = null;

  constructor(private publicacionesService: PublicationService, private fb: FormBuilder) { 
    this.getPublicaciones();
    
  }

  toggleDropdown(pubId: string): void {
    this.activeDropdownId = this.activeDropdownId === pubId ? null : pubId;
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

  deletePub(id: any) {
    this.publicacionesService.deletePUB(id).subscribe();
  }

  // MODAL PARA EDITAR

  openEditModal(item: any = null): void {
    this.editingData = item;    
    this.modalOpen = !this.modalOpen;
    console.log(this.editingData.imagen_contenido);
    
  }

  closeModal(): void {
    this.modalOpen = false;
    this.editingData = null;
  }


}
