import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, createUserWithEmailAndPassword, Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private auth: Auth

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
  }

  registerForm({email, password}){
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
      });
  }
  
  
}
