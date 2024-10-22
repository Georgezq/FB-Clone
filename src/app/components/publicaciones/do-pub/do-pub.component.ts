import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-do-pub',
  templateUrl: './do-pub.component.html',
  styleUrls: ['./do-pub.component.css']
})
export class DoPubComponent {

  @Input() userName: string = '';
  @Input() lastName: string = '';
  @Input() userPhoto: string = '';
  @Input() loading: boolean = false;

  placeHolderText: string;
  addFoto: boolean = false;
  imageUrl: string | ArrayBuffer | null = null;
  previewPh: boolean = false;

  constructor() {
    this.placeHolderText = `¿Qué estás pensando, `;
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

}
