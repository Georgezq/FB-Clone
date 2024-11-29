import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, Firestore, getFirestore, limit, orderBy, query, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { concatMap, map, merge, Observable, of, take, tap } from 'rxjs';
import { Users } from 'src/app/models/users/users';
import { AuthService } from '../auth/auth.service';
import { Chat, Message } from 'src/app/models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private auth: Auth;
  private firestore: Firestore;
  private userAuth: any;

  constructor(app: FirebaseApp, private authService: AuthService) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  createChat(otherUser: Users): Observable<string> {
    const ref = collection(this.firestore, 'chats');
    return this.authService.getUserLogged().pipe(
      take(1),
      concatMap(user => {
        // Verificar que los usuarios existan y tengan un id_user
        if (!user?.id_user || !otherUser?.id_user) {
          throw new Error('error');
          
        }
  
        const chatData = {
          userIds: [user.id_user, otherUser.id_user],
          users: [
            {
              nombre: user.nombre || '',
              apellido: user.apellido || '',
              foto: user.foto || '',
            },
            {
              nombre: otherUser.nombre || '',
              apellido: otherUser.apellido || '',
              foto: otherUser.foto || '',
            }
          ]
        };
  
        // Eliminar cualquier propiedad undefined
        Object.keys(chatData).forEach(key => 
          chatData[key] === undefined && delete chatData[key]
        );
  
        return addDoc(ref, chatData);
      }),
      map(ref => ref.id)
    );
  }


  // Obtener el chat en curso

  getUserChatsIds(otherUser: Chat): Observable<string | null> {
    return new Observable(observer => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const chatsRef = collection(this.firestore, 'chats');
          const q = query(chatsRef, where('userIds', '==', [user.uid, otherUser.userIds[1]]), limit(1));
          const q2 = query(chatsRef, where('userIds', '==', [otherUser.userIds[1], user.uid]), limit(1));
          
          merge(
            collectionData(q, { idField: 'id' }),
            collectionData(q2, { idField: 'id' })
          ).pipe(
            take(1),
            map(chats => chats.length > 0 ? chats[0]['id'] as string : null)
          ).subscribe(
            chatId => observer.next(chatId),
            error => observer.error(error)
          );
        } else {
          observer.next(null);
        }
      });
  
      // Retorna una función de limpieza para desuscribirse cuando sea necesario
      return () => unsubscribe();
    });
  }

  get myChats$(): Observable<Chat[]>{
    const ref = collection(this.firestore, 'chats');
    return this.authService.getUserLogged().pipe(
      concatMap((user) => {
        const myQuery = query(ref, where('userIds', 'array-contains', user?.id_user))
        return collectionData(myQuery, { idField: 'id' }).pipe(
          map(chats => this.addChatNameAndPic(user?.id_user ?? ``, chats as Chat[]))
        ) 
      })
    )
  }

  addChatNameAndPic(currentUserId: string, chats: Chat[]): Chat[] {
    chats.forEach(chat => {
      const otherIndex = chat.userIds.indexOf(currentUserId) === 0 ? 1 : 0;
      const { nombre, apellido, foto } = chat.users[otherIndex];
      chat.chatName = nombre + ' ' + apellido ;
      chat.chatPic = foto;
    })
    return chats;
  }

  addChatMessage(chatdId: string, message: string): Observable<any>{
    const ref = collection(this.firestore, 'chats', chatdId, 'messages');
    const chatRef = doc(this.firestore, 'chats', chatdId);
    const today = Timestamp.fromDate(new Date())
    return this.authService.getUserLogged().pipe(
      take(1),
      concatMap((user) => addDoc(ref, {
        text: message,
        senderId: user?.id_user,
        sendtDate: today
      })),
      concatMap(() => updateDoc(chatRef, { lastMessage: message, lastMessageDate: today }))
    )
  }

  getChatMessages$(chatId: any): Observable<Message[]> {
    console.log('chatId recibido en getChatMessages$:', chatId);
  
    if (!chatId || typeof chatId !== 'string') {
      console.error('chatId inválido:', chatId);
      return of([]);
    }
  
    chatId = String(chatId); // Asegura que sea una cadena
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    const queryAll = query(ref, orderBy('sendtDate', 'asc'));
    return collectionData(queryAll, { idField: 'id' }) as Observable<Message[]>;
  }
  

}
