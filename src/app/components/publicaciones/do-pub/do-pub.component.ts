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

  constructor() {
    this.placeHolderText = `¿Qué estás pensando, `;
  }

}
