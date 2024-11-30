import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDefaultImage]'
})
export class DefaultImageDirective {

  constructor(private elementImg: ElementRef) { }

  @HostListener('error')

  onError():void{
    this.elementImg.nativeElement.src = '../../../assets/images/pordefault.jpeg'
  }

}
