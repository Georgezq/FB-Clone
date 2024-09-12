import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Historias } from 'src/app/models/historias';

@Injectable({
  providedIn: 'root'
})
export class StoryUserService {

  historias: Historias[] = [];
  API_URL1 = '';

  constructor(private httpClient: HttpClient) { }

  getHistorias(){
    return this.httpClient.get(`${this.API_URL1}/historias`)
  }

  setHistorias(historias: Historias[]){
    this.historias = historias;
  }

  addStory(historias: Historias) {
    return this.httpClient.post(`${this.API_URL1}/historias`, historias)
  }

}
