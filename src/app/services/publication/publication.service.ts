import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth } from '@angular/fire/auth';
import { collection, collectionData, Firestore, getFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { Publication } from 'src/app/models/publicaciones';

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
  


}
