import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent {

  registerUser: FormGroup | null ;
  closeModal: string = '';
  error_tooltip: string = '';
  personalizado: boolean = false;
  generoOptions = [
    { tipo: 'Mujer', value: 'M' },
    { tipo: 'Hombre', value: 'H' },
    { tipo: 'Personalizado', value: 'P' },
  ]

  generoPersonalizado = [
    { tipo: 'Femenino: "Felicítala por su cumpleaños"', value: 'ella' },
    { tipo: 'Masculino: "Felicítalo por su cumpleaños"', value: 'el' },
    { tipo: 'Neutro: "Felicítale por su cumpleaños"', value: 'elle' },
  ]

  constructor(private fb: FormBuilder, private userService: AuthService) { 
    this.inicializarForm();
    this.isPersonalizado()
   }

  private inicializarForm(){
    this.registerUser = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      genero: ['', [Validators.required]],
      pronombre: [''],
      generoSeleccion: [''],
      generoPersonalizado: [''],
    });

    // Escuchar cambios en generoSeleccion
    this.registerUser.get('generoSeleccion').valueChanges.subscribe(value => {
      if (value === 'P') {
        this.registerUser.get('pronombre').setValidators([Validators.required]);
        this.registerUser.get('generoPersonalizado').enable();
      } else {
        this.registerUser.get('pronombre').clearValidators();
        this.registerUser.get('pronombre').reset();
        this.registerUser.get('generoPersonalizado').disable();
        this.registerUser.get('pronombre').reset();
      }
      this.registerUser.get('pronombre').updateValueAndValidity();
      this.registerUser.get('generoPersonalizado').updateValueAndValidity();
    });
  }

  isPersonalizado(): boolean {
    const valor = this.registerUser.get('genero').value;
    if(valor === 'P') return true;
    return false;
  }

  isInvalid(field: string): boolean {
    const control = this.registerUser.get(field);
    return control!.invalid && (control!.dirty || control!.touched);
  }

  registerWithEmailAndPassword(){
    this.closeModal = 'modal';
 
    if(this.registerUser.valid){
      this.userService.registerForm(this.registerUser.value)
      // limpiar formulario
      this.registerUser.reset();
    } else {
      Object.keys(this.registerUser.controls).forEach(key => {
        const control = this.registerUser.get[key];
        control.markAsTouched();
      })
    }
  }

  

}
