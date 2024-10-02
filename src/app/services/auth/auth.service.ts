import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, sendPasswordResetEmail, updateProfile, onAuthStateChanged } from '@angular/fire/auth';
import { addDoc, collection, doc, docData, Firestore, getDoc, getFirestore, updateDoc, where, query, collectionData  } from '@angular/fire/firestore';
import { lastValueFrom, map, Observable } from 'rxjs';

import { Users } from 'src/app/models/users/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
            id_user: this.auth.currentUser.uid,
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
    ).catch((error) => {
      throw new Error(error.message);
    });
  }

  getUserLogged(): Observable<any> {
    return new Observable(observer => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const collectionRef = collection(this.firestore, 'users');
          const q = query(collectionRef, where('id_user', '==', user.uid));
          
          collectionData(q, { idField: 'id' }).pipe(
            map(informacion => informacion[0])
          ).subscribe(
            result => observer.next(result),
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

  //Enviar correo para reestablecer contraseña

  async sendEmailToResetPassword(user: Users){
    return sendPasswordResetEmail(this.auth, user.email);  
  }

  async updateProfileFireStore(id: string, user: Partial<Users>){
    const collectionRef = collection(this.firestore, 'users');
    const q = query(collectionRef, where('id_user', '==', id));
    const docData = await lastValueFrom(collectionData(q, { idField: 'id'}).pipe(
        map(informacion => {
          return informacion[0]
        } 
      )))
        console.log(docData);
    const documentRef = doc(this.firestore, `users/${docData.id}`)
    return await updateDoc(documentRef, {...user})
  
  }

  async updateProfileUser(user: Users){
    return updateProfile(this.auth.currentUser, {photoURL: user.foto })
  }
  
  
}
