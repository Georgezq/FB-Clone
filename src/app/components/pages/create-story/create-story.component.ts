import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  seeAddStoryWithText(){
    this.addStoryWithText = true;
  }

  seeAddStoryWithImage(){
    console.log(this.imagenHistoria.value);
    this.imagenHistoria.valueChanges.subscribe((res) => console.log(res) )
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.isValidImageFile(file)) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        this.imageUrl = e.target?.result || null;
      };

      reader.readAsDataURL(file);
    } else {
      console.error('Archivo no válido o no es una imagen');
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  private isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validTypes.includes(file.type);
  }

  
  constructor(private authService: AuthService){
    
   this.seeAddStoryWithImage()
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

  async ngOnInit() {
    this.obtenerDatosUsuarioLogueado();
  }

  private obtenerDatosUsuarioLogueado(){
    this.authService.getUserLogged().subscribe((user: any) => {
      this.nombre = user.nombre;
      this.foto = user.foto;
      this.apellidos = user.apellido;
      
    })
  }

}
