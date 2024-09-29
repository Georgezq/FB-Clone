import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip-message',
  template: `
  <div [id]="id" role="tooltip"
    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    {{ message }}
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
  `

})
export class TooltipMessageComponent {

  @Input() id: any = null;
  @Input() message: string = '';

}
