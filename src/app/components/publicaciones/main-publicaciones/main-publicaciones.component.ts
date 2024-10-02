import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-publicaciones',
  templateUrl: './main-publicaciones.component.html',
  styleUrls: ['./main-publicaciones.component.css']
})
export class MainPublicacionesComponent {

  @Input() userName: string = '';
  @Input() userPhoto: string = '';
  @Input() loading: boolean = false;
  // @Input() publications: any[] = [];

}
