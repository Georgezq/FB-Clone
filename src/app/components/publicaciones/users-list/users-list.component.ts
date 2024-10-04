import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { Chat } from 'src/app/models/chat';
import { Users } from 'src/app/models/users/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chats/chat.service';

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
export class UsersListComponent {

  @Input() loading: boolean = false;
  @Input() otherUsers: Users[];

  usuariosSeleccionados: Users[] = [];
  chatWithUser: Users[] = [];
  isNew: boolean = false;
  openChatControl: boolean = false;

  chats$ = this.chatService.myChats$;
  //messages$ = this.
  onlyAChat: string = '';

  chatListControl = new FormControl('');
  messagesControl = new FormControl('');

  constructor(private authService: AuthService, private chatService: ChatService){
    
  }
  
  // Funcion para agregar una nueva burbuja de chat
  
  addNewBubbleChat(otherUser: Users) {
    console.log(otherUser);
    
    this.chatService.createChat(otherUser).subscribe();
    this.authService.getUsersSelectedById(otherUser.id_user).subscribe((users:any) => {
      if (users && users.length > 0) {
        const newUser = users[0];
        if (!this.usuarioYaSeleccionado(newUser)) {
          this.isNew = true;
          this.usuariosSeleccionados.push(newUser); 
          this.deleteChat(otherUser)  
        } 
      } 
    });
  }

  // Eliminar la burbuja seleccionada 

  deleteBubbleChat(userId:string){  
  const index = this.usuariosSeleccionados.findIndex(user => {
    return user.id_user === userId || user.id_user === userId;
  });
  if (index !== -1) this.usuariosSeleccionados.splice(index, 1)[0];  
  }

  // Abrir el chat con el usuario seleccionado

  openChat(otherUser: Chat) {    
    this.chatService.getUserChatsIds(otherUser).subscribe((users:any) => {
      this.onlyAChat = users;
            
      if (users && users.length > 0) {
        const newUser = users[0];
        this.chatWithUser.push(newUser);  
        this.openChatControl = true;  
      } 
    });
  }

  deleteChat(chat: any) {
    const index = this.chatWithUser.findIndex(user => {
      return user.id_user === chat || user.id_user === chat;
    });
    if (index !== -1) this.chatWithUser.splice(index, 1)[0];  
  }

  // Función auxiliar para verificar si un usuario ya está en la lista
  private usuarioYaSeleccionado(user: any): boolean {
    return this.usuariosSeleccionados.some(u => u.id_user === user.id_user);
  }

  // Función auxiliar para verificar si un chat ya esta activo

  private chatYetOpened(user: Users): boolean {
    return this.chatWithUser.some(u => u.id_user === user.id_user);
  }

  sendMessage(id_chat: string){
    const message = this.messagesControl.value
    this.chatService.addChatMessage(id_chat, message).subscribe()
    this.messagesControl.setValue('');
  }

}
