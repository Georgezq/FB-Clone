import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth } from '@angular/fire/auth';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getFirestore, orderBy, query, Timestamp, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { combineLatest, concatMap, from, map, Observable, switchMap, take } from 'rxjs';
import { Publication, PublicationComments } from 'src/app/models/publicaciones';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private auth: Auth;
  private firestore: Firestore;
  private userAuth: any;

  constructor(app: FirebaseApp, private authService: AuthService) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  // Metodo para crear una publicacion segun el usuario logueado

  getPublications(): Observable<Publication[]> {
    const ref = collection(this.firestore, 'publications');
    const queryAll = query(ref, orderBy('fechaPublicacion', 'desc' ))
    return collectionData(queryAll, { idField: 'id' }) as Observable<Publication[]>;
  }

  getPubComments$(publicationId: string): Observable<PublicationComments[]>{
    const ref = collection(this.firestore, 'publications', publicationId, 'comments')
    const queryAll = query(ref, orderBy('sendtDate', 'asc' ))    
    return collectionData(queryAll, {idField: 'id'}) as Observable<PublicationComments[]>
  }

  getPublicationsWithUser(): Observable<Publication[]> {
    return this.getPublications().pipe(
      switchMap((publications: Publication[]) => {
        const userObservables = publications.map(pub => 
          this.authService.getUserById(pub.id_user).pipe(
            map(user => ({ ...pub, user }))  // Combina la publicación con el usuario
          )
        );
        return combineLatest(userObservables);  // Retorna un array con todas las publicaciones y sus usuarios
      })
    );
  }

  addPub(pubBody: Publication): Observable<any>{
    const ref = collection(this.firestore, 'publications');
    const today = Timestamp.fromDate(new Date())
    return this.authService.getUserLogged().pipe(
      take(1),
      concatMap((user) => addDoc(ref, {
        id_user: user?.id_user,
        texto_contenido: pubBody.texto_contenido || null,
        imagen_contenido: pubBody?.imagen_contenido || null,
        fechaPublicacion: today
      })) 
    )
  }

  getPubCommentWithUser(id:any): Observable<PublicationComments[]> {
    return this.getPubComments$(id).pipe(
      switchMap((comments: PublicationComments[]) => {
        const userObservables = comments.map(pub => 
          this.authService.getUserById(pub.senderId).pipe(
            map(user => ({ ...pub, user }))  
          )
        );
        return combineLatest(userObservables)
      }
      )
    )
  }

  editPub(id:any, pub: Partial<Publication>): Observable<void>{
    const destinoDocRef = doc(this.firestore, `publications/${id}`);
    return from(updateDoc(destinoDocRef, pub));    
  }

  deletePUB(id: any): Observable<void> {
    const destinoDocRef = doc(this.firestore, `publications/${id}`);
    return from(deleteDoc(destinoDocRef));
  }
  
  
  addCommentToPub(publicationId: string, comment: string): Observable<any>{
    const ref = collection(this.firestore, 'publications', publicationId, 'comments');
    const pubRef = doc(this.firestore, 'publications', publicationId);
    const today = Timestamp.fromDate(new Date())
    return this.authService.getUserLogged().pipe(
      take(1),
      concatMap((user) => addDoc(ref, {
        text: comment,
        senderId: user?.id_user,
        sendtDate: today
      })),
      concatMap(() => updateDoc(pubRef, { lastComment: comment, lastCommentDate: today }))
    )
  }


}
