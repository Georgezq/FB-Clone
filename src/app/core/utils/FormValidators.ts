import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class FormValidators {
  
  customeEmailValidator(control: AbstractControl){
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const value = control.value
    if(!pattern.test(value) && control.touched)
      return { emailError: true };
    else return null
  }
  
}