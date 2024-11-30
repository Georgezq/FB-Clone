import { Component } from '@angular/core';
import { ref, uploadBytesResumable, getDownloadURL, Storage, uploadBytes } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HistoriesService } from 'src/app/services/historias/histories.service';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent {

  addStoryWithText: boolean = false;
  addStoryWithImage: boolean = false;

  nombre: string = '';
  foto: string = '';
  apellidos: string = '';
  selectedOption: string = '';  // Esta es la opción seleccionada

  textoHistoria = new FormControl('');
  imagenHistoria = new FormControl('');
  tipoTexto = new FormControl('claro');
  imageUrl: string | ArrayBuffer | null = null;
  userId: any;
  fileRef:any;
  url: any;
  file: any;
  flag: boolean = false;

  constructor(private authService: AuthService, private storage: Storage, private storieService: HistoriesService, private router: Router){
  }

  ngOnInit() {
    this.obtenerDatosUsuarioLogueado();
  }

  private obtenerDatosUsuarioLogueado(){
    this.authService.getUserLogged().subscribe((user: any) => {
      this.nombre = user.nombre;
      this.foto = user.foto;
      this.apellidos = user.apellido;
      this.userId = user.id_user;
    })
  }

  // TODO ESTO PARA PUBLICAR LA HISTORIA CON IMAGEN

  private isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validTypes.includes(file.type);
  }

  onFileSelected(event: any): void {
    this.addStoryWithImage = true;
    this.file = event.target.files[0];
    if (this.file && this.isValidImageFile(this.file)) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        this.imageUrl = e.target?.result || null;
      };

      reader.readAsDataURL(this.file);
    } else {
      // Aquí podrías mostrar un mensaje de error al usuario
    }
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

  async publishStoryWithImage() {
    try {
      if (this.file) {
        await this.onFileSelectedToAdd(); // Esperar a que la imagen se suba y obtener la URL
        this.imagenHistoria.patchValue(this.url); // Asignar la URL al formulario
        this.addStoryWithImage = false; // Cerramos el modal de publicación con imagen
        this.flag = true; 
      }
      
           
      const storyData = {
        tipoHistoria: "Imagen",
        contenido: {
          imagen_contenido: this.url,
          texto_contenido: this.textoHistoria.value || ''
        },
        fechaPublicacion: new Date(), // Fecha de creación
        id_user: this.userId // Id del usuario logueado
      };
  
      await this.storieService.addStoryToFirestore(storyData);
      this.router.navigate(['home'])
    } catch (error) {
      console.error('Error al subir la historia:', error);
      
    }
  }

  //TODO ESTO PARA PUBLICAR LA HISTORIA CON TEXTO

  seeAddStoryWithText(){
    this.addStoryWithText = true;
  }

  getBackgroundStyle() {
    //Aun por cambiar >D
    switch (this.selectedOption) {
      case 'opcion1':
        return { 'background-image': 'url(assets/images/backgrounds/opcionfondo1.jpg)' };
      case 'opcion2':
        return { 'background-image': 'url(assets/images/backgrounds/opcionfondo2.jpg)' }; 
      case 'opcion3':
        return { 'background-image': 'url(assets/images/backgrounds/opcionfondo3.jpg)' }; 
      case 'opcion4':
        return { 'background-image': 'url(assets/images/backgrounds/opcionfondo4.jpg)' }; 
      case 'opcion5':
        return { 'background-image': 'url(assets/images/backgrounds/opcionfondo5.jpg)' }; 
      case 'opcion6':
        return { 'background-image': 'url(assets/images/backgrounds/opcionfondo6.jpg)' }; 
      default:
        return { 'background-image': 'url(assets/images/backgrounds/opcionfondo1.jpg)' };  // Fondo por defecto
    }
  }

  changeStyleText(type:any){    
    switch (type) {
      case 'claro':
        return 'type-claro';
      case 'informal':
        return 'type-informal';
      case 'elegante':
        return 'type-elegante';
      case 'titulo':
        return 'type-titulo';
      default:
        return 'type-claro';  // Clase por defecto
    }
  }

  async uploadBackground(filePath: string): Promise<string> {
    const fileRef = ref(this.storage, `backgrounds/${filePath.split('/').pop()}`);
    const fileBlob = await fetch(filePath).then(res => res.blob());
    const snapshot = await uploadBytes(fileRef, fileBlob);
    return getDownloadURL(snapshot.ref); // Devuelve la URL de descarga
  }

  async prepareBackgroundForUpload() {
    const localPath = this.getBackgroundStyle()['background-image'].slice(4, -1).replace(/['"]/g, ''); // Extrae la URL del estilo
    return await this.uploadBackground(localPath);
  }
  
  async publishStory() {
    try {
      const backgroundUrl = await this.prepareBackgroundForUpload();
  
      const storyData = {
        tipoHistoria: "Textual",
        contenido: {
          imagen_contenido: backgroundUrl,
          texto_contenido: this.textoHistoria.value || 'EMPIEZA A ESCRIBIR'
        },
        tipoTexto: this.tipoTexto.value, // Tipo de texto
        fechaPublicacion: new Date(), // Fecha de creación
        id_user: this.userId // Id del usuario logueado
      };
  
      await this.storieService.addStoryToFirestore(storyData);
    } catch (error) {
      console.error('Error al subir la historia:', error);
      
    }
  }

}
