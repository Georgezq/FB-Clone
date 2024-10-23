import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Publication } from 'src/app/models/publicaciones';
import { PublicationService } from 'src/app/services/publication/publication.service';

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

  constructor(private pubService: PublicationService, private fb: FormBuilder) {
    this.placeHolderText = `¿Qué estás pensando, `;   
  }

  ngOnInit(): void {
       // Inicializar formulario reactivo
     this.pubForm = this.fb.group({
      texto_contenido: ['']
   });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.isValidImageFile(file)) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        this.imageUrl = e.target?.result || null;
      };

      reader.readAsDataURL(file);
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

  makePub(){    
    this.pubService.addPub(this.pubForm.value).subscribe((data) => console.log(data));
  }

}
