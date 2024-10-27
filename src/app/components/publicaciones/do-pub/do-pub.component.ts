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
  modalOpen: boolean = false;

  pubForm: FormGroup;
  addFoto: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
       // Inicializar formulario reactivo
    
  }

  openEditModal() {
    this.modalOpen = !this.modalOpen;
  }

}
