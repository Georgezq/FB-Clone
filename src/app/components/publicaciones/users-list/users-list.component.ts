import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent{

  @Input() loading: boolean = false;
  @Input() otherUsers: any = [];

  usuariosSeleccionados: any[] = [];

  constructor(private authService: AuthService){
  }

  // Funcion para agregar una nueva burbuja de chat

  addNewBubbleChat(id: string) {
    this.authService.getUsersSelectedById(id).subscribe((users:any) => {
      if (users && users.length > 0) {
        const newUser = users[0];
        if (!this.usuarioYaSeleccionado(newUser)) this.usuariosSeleccionados.push(newUser);        
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

  // Función auxiliar para verificar si un usuario ya está en la lista
  private usuarioYaSeleccionado(user: any): boolean {
    return this.usuariosSeleccionados.some(u => u.id === user.id);
  }

}
