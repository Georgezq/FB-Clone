import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class FormValidators {
  
  customeEmailValidator(control: AbstractControl){
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    const value = control.value
    if(!pattern.test(value) && control.touched)
      return { emailError: true };
    else return null
  }
  
}