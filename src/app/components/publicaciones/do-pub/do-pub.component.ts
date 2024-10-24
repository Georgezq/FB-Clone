import { Component, Input, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Publication } from 'src/app/models/publicaciones';
import { PublicationService } from 'src/app/services/publication/publication.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-do-pub',
  templateUrl: './do-pub.component.html',
  styleUrls: ['./do-pub.component.css']
})
export class DoPubComponent implements OnInit{

  @Input() userName: string = '';
  @Input() lastName: string = '';
  @Input() userPhoto: string = '';
  @Input() loading: boolean = false;

  placeHolderText: string;
  addFoto: boolean = false;
  imageUrl: string | ArrayBuffer | null = null;
  previewPh: boolean = false;
  pub: Publication;
  pubForm: FormGroup;
  file: any;

  textfile: string = 'Seleccionar imagen...';

  formData: FormData;
  url: string;
  fileRef:any;

  constructor(private pubService: PublicationService, private fb: FormBuilder, private storageS: StorageService, private storage: Storage) {
    this.placeHolderText = `¿Qué estás pensando, `;   
  }

  ngOnInit(): void {
       // Inicializar formulario reactivo
     this.pubForm = this.fb.group({
      texto_contenido: [''],
      imagen_contenido: ['']
   });
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    if (this.file && this.isValidImageFile(this.file)) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        this.imageUrl = e.target?.result || null;
      };

      reader.readAsDataURL(this.file);
      this.addFoto = false;
      this.previewPh = true;
    } else {
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }
  
 
  private isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validTypes.includes(file.type);
  }

  async makePub() {  
    // Verificar si hay una imagen para subir
    if (this.file) {
      await this.onFileSelectedToAdd(); // Esperar a que la imagen se suba y obtener la URL
      this.pubForm.patchValue({ 'imagen_contenido': this.url }); // Asignar la URL al formulario
    }
    
    // Enviar el formulario a Firebase solo después de obtener la URL
    this.pubService.addPub(this.pubForm.value).subscribe(() => {
       this.pubForm.reset(); // Limpiar el formulario después de enviar
      this.closeModal();
    });
  }

  async onFileSelectedToAdd(){
    await this.uploadFile(this.file)
  }

  async uploadFile(file: File): Promise<void> {
    const filePath = `archivos/${file.name}`;
    this.fileRef = ref(this.storage, filePath);
    
    const uploadFile = uploadBytesResumable(this.fileRef, file);
  
    return new Promise((resolve, reject) => {
      uploadFile.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error('Error al cargar el archivo:', error);
          reject(error); // En caso de error, rechazamos la promesa
        },
        async () => {
          // Obtenemos la URL de descarga una vez finalizada la subida
          this.url = await getDownloadURL(this.fileRef);
          resolve(); // Resolvemos la promesa cuando la URL está lista
        }
      );
    });
  }


  // Cerrar modal

  closeModal(){
    const closeButton = document.querySelector('[data-modal-hide="default-modal"]');
    if (closeButton) {
      closeButton.dispatchEvent(new Event('click'));
    }
  }

}
