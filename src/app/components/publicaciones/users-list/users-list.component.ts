import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
      })),
      transition('open <=> closed', [
        animate('.3s ease-in-out')
      ])
    ]),

  ]
})
export class UsersListComponent{

  @Input() loading: boolean = false;
  @Input() otherUsers: any = [];

  usuariosSeleccionados: any[] = [];
  chatWithUser: any[] = [];
  isNew: boolean = false;

  constructor(private authService: AuthService){
  }

  // Funcion para agregar una nueva burbuja de chat

  addNewBubbleChat(id: string) {
    this.authService.getUsersSelectedById(id).subscribe((users:any) => {
      if (users && users.length > 0) {
        const newUser = users[0];
        if (!this.usuarioYaSeleccionado(newUser)) {
          this.isNew = true;
          this.usuariosSeleccionados.push(newUser); 
          this.deleteChat(id)       
        } 
      } 
    });
  }

  // Eliminar la burbuja seleccionada 

  deleteBubbleChat(userId:string){  
  const index = this.usuariosSeleccionados.findIndex(user => {
    return user.id === userId || user.id_user === userId;
  });
  if (index !== -1) this.usuariosSeleccionados.splice(index, 1)[0];  
  }

  // Abrir el chat con el usuario seleccionado

  openChat(userId: string) {
    this.authService.getUsersSelectedById(userId).subscribe((users:any) => {
      if (users && users.length > 0) {
        const newUser = users[0];
        if (!this.chatYetOpened(newUser)) {
          this.isNew = true;
          this.chatWithUser.push(newUser);  
          this.deleteBubbleChat(userId);      
        } 
      } 
    });
  }

  deleteChat(userId: string) {
    const index = this.chatWithUser.findIndex(user => {
      return user.id === userId || user.id_user === userId;
    });
    if (index !== -1) this.chatWithUser.splice(index, 1)[0];  
  }

  // Función auxiliar para verificar si un usuario ya está en la lista
  private usuarioYaSeleccionado(user: any): boolean {
    return this.usuariosSeleccionados.some(u => u.id === user.id);
  }

  // Función auxiliar para verificar si un chat ya esta activo

  private chatYetOpened(user: any): boolean {
    return this.chatWithUser.some(u => u.id === user.id);
  }

}
