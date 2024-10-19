import { Component, Input, OnInit } from '@angular/core';
import { Historias } from 'src/app/models/historias';
import { HistoriesService } from 'src/app/services/historias/histories.service';


@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.css']
})
export class HistoriasComponent implements OnInit{

  @Input() userPhoto: string;

  loadingHistoria: boolean = false;
  // @Input() publications: any[] = [];
  contenidoHistorias: Historias[];

  constructor(private historiasService: HistoriesService) { 
    this.getPublicaciones()
   }


  ngOnInit(): void {
  }

  getPublicaciones(){ 
    this.historiasService.getHistoriesWithUser().subscribe((publicaciones: Historias[]) => {
      this.contenidoHistorias = publicaciones;
      
      setTimeout(() => {
        this.loadingHistoria = true
      }, 1000);
    });  
  }

}
