import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, catchError, combineLatest, filter, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
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
export class UsersListComponent implements OnInit{

  @ViewChild('endOfChat') endOfChat: ElementRef;
  @Input() loading: boolean = false;
  userId: string;
  usuariosSeleccionados: Users[] = [];
  isNew: boolean = false;
  users$: any;
  chats$ = this.chatService.myChats$;

  chatListControl = new FormControl();
  messagesControl = new FormControl('');
  searchControl = new FormControl('');
  private chatIdSubject = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService, private chatService: ChatService){
  }


  ngOnInit() {
    this.obtenerDatosUsuarioLogueado();
    this.obtenerCambios();
    window.addEventListener('scroll', this.checkScrollPosition.bind(this));

  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.checkScrollPosition.bind(this));
  }

  selectedChats$ = combineLatest([
    this.chatListControl.valueChanges,
    this.chats$
  ]).pipe(
    map(([value, chats]) => chats.find(c => c.id === value[0]))
  )

  
  messages$ = this.chatIdSubject.asObservable().pipe(
    switchMap(chatId => {
      return chatId
        ? this.chatService.getChatMessages$(chatId.toString())
        : of([]);
    }),
    tap(() => {
      this.scrollToBottom();
    })
  );

  closeChat() {
    this.chatListControl.setValue([]); // Limpia la selección de chats
  } 

  createChat(otherUser: Users){
    this.chatService.isExistingChat(otherUser?.id_user).pipe(
      switchMap(chatId => {
        if(chatId) {
          return of(chatId);
        } else {
          return this.chatService.createChat(otherUser);
        }
      })
    ).subscribe(chatId => {
      this.chatListControl.setValue([chatId]);
      this.messagesControl.setValue('');
      this.chatIdSubject.next(chatId);
    })
  }
  
  // Eliminar la burbuja seleccionada 

  deleteBubbleChat(userId:string){  
  const index = this.usuariosSeleccionados.findIndex(user => {
    return user.id_user === userId || user.id_user === userId;
  });
  if (index !== -1) this.usuariosSeleccionados.splice(index, 1)[0];  
  }

  private obtenerCambios(){
    this.chatListControl.valueChanges.pipe(
      startWith(this.chatListControl.value),
      tap(chatId => this.chatIdSubject.next(chatId))
    ).subscribe();
  }
  
  private obtenerDatosUsuarioLogueado(){
    this.authService.getUserLogged().subscribe((user: Users) => {
      this.userId = user.id_user;      
      this.users$ = combineLatest([
        this.authService.allUsers$, 
        this.searchControl.valueChanges.pipe(startWith(''))]
      ).pipe(
        map(([users, searchString]) => users.filter(u => u.nombre?.toLowerCase().includes(searchString?.toLowerCase()) && u.id_user !== this.userId))
      );
    })
  }

  sendMessage(){
    const message = this.messagesControl.value;
    const selectChatId = this.chatListControl.value[0];
    this.chatService.addChatMessage(selectChatId, message).subscribe(() => {
      this.scrollToBottom();
    })
    this.messagesControl.setValue('');
  }

 
  scrollToBottom() {
    setTimeout(() => {
      if(this.endOfChat){
        this.endOfChat.nativeElement.scrollIntoView({ behavior:'smooth' });
      }
    },100)
  }

  checkScrollPosition() {
    const scrollPosition = window.scrollY; // Posición vertical del scroll
    const triggerHeight = 998; // Cambia este valor al que prefieras
  
    if (scrollPosition >= triggerHeight) {
      this.closeChat();
    }
  }

}
