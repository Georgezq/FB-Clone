import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.css']
})
export class ErrorFormComponent {

  @Input() error = false;
  @Input() headerError = '';
  @Input() errorMessage = '';

}
