import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,Auth } from '@angular/fire/auth';
import { addDoc, collection, Firestore, getFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Users } from 'src/app/models/users/users';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private auth: Auth;
  private firestore: Firestore;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  async registerForm(user: Users) {
    return await createUserWithEmailAndPassword(this.auth, user.email, user.password).then(
      async () => {
        await addDoc(collection(this.firestore, 'users'), {
          email: user.email,
          password: user.password,
          nombre: user.nombre,
          apellido: user.apellido,
          foto: user.apellido,
        })
      });
  }

  async loginForm(user: Users) {
    return await signInWithEmailAndPassword(this.auth,user.email, user.password);
  }
  
  
}
