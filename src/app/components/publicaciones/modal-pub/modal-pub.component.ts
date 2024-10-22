import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-pub',
  templateUrl: './modal-pub.component.html',
  styleUrls: ['./modal-pub.component.css']
})
export class ModalPubComponent {

  @Input() userName: string;

}
