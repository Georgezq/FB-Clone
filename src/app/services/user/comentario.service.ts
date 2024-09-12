import { HttpClient } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { Comentario } from 'src/app/models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  comentario: Comentario[] = [];
  API_URL1 = '';

  constructor(private httpClient: HttpClient) { }

  getComentario(){
    return this.httpClient.get(`${this.API_URL1}/comentarios`)
  }

  setComentario(comentario: Comentario[]){
    this.comentario = comentario;
  }

  addComentario(comentario: Comentario) {
    return this.httpClient.post(`${this.API_URL1}/comentarios`, comentario)
  }

}
