import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth } from '@angular/fire/auth';
import { collection, collectionData, Firestore, getFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { map, Observable } from 'rxjs';
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

  getPubications(): Observable<Publication[]> {
    const ref = collection(this.firestore, 'publications');
    return collectionData(ref, { idField: 'id' }) as Observable<Publication[]>;
  }


}
