import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth } from '@angular/fire/auth';
import { Firestore, getFirestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, switchMap, map, combineLatest } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Historias } from 'src/app/models/historias';

@Injectable({
  providedIn: 'root'
})
export class HistoriesService {

  private auth: Auth;
  private firestore: Firestore;
  private userAuth: any;

  constructor(app: FirebaseApp, private authService: AuthService) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  // Metodo para crear una publicacion segun el usuario logueado

  getHistories(): Observable<Historias[]> {
    const ref = collection(this.firestore, 'stories');
    return collectionData(ref, { idField: 'id' }) as Observable<Historias[]>;
  }

  getHistoriesWithUser(): Observable<Historias[]> {
    return this.getHistories().pipe(
      switchMap((stories: Historias[]) => {
        const userObservables = stories.map(sto => 
          this.authService.getUserById(sto.id_user).pipe(
            map(user => ({ ...sto, user }))  // Combina la historia con el usuario
          )
        );
        return combineLatest(userObservables);  // Retorna un array con todas las historias y sus usuarios
      })
    );
  }
}
