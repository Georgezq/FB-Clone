import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, Firestore, getFirestore, orderBy, query, Timestamp, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { combineLatest, concatMap, map, Observable, switchMap, take } from 'rxjs';
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
    return collectionData(ref, { idField: 'id' }) as Observable<Publication[]>;
  }

  getPubComments$(publicationId: string): Observable<PublicationComments[]>{
    const ref = collection(this.firestore, 'publications', publicationId, 'comments')
    
    return collectionData(ref) as Observable<PublicationComments[]>
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
