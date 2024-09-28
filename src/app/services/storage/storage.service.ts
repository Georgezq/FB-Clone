import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { Users } from 'src/app/models/users/users';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage = getStorage();
 
  constructor(app: FirebaseApp) {
   
  }

  async uploadImageProfile(userId: string, file: File ){
    const filePath = ref(this.storage, `userProfile/${userId}`)
    const uploadTask =  uploadBytesResumable(filePath, file, { 
      contentType: 'image/jpg',
     })
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
      console.log('Upload is ' + progress + '% done');
    }),
    (error) => {
      console.log(error);
      
    },
    () => {
      const url = getDownloadURL(filePath)
      console.log(url);
    }
  }

}
