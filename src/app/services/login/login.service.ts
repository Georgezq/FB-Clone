import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { addDoc, collection, Firestore, getFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Users } from 'src/app/models/users/users';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private auth: Auth;
  private firestore: Firestore;
  private userAuth: any;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  async registerForm(user: Users) {
    return await createUserWithEmailAndPassword(this.auth, user.email, user.password).then(
      async () => {
        if(user != null) {
          await addDoc(collection(this.firestore, 'users'), {
            id_user: user.id_user,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            password: user.password,
          });
        }
      });
  }

  async loginForm(user: Users) {
    return await signInWithEmailAndPassword(this.auth,user.email, user.password).then(
      async () => {
        this.userAuth = this.auth.currentUser;
        if(this.userAuth != null) {
          const uid = this.userAuth.uid
          const currentUser = {
            uid: uid,
            token: this.userAuth.accessToken,
          }
          localStorage.setItem('currenUser',JSON.stringify(currentUser),)
        }
      
      }
    );
  }

  //Enviar correo para reestablecer contraseña

  async sendEmailToResetPassword(user: Users){
    return sendPasswordResetEmail(this.auth, user.email);  
  }
  
  
}
