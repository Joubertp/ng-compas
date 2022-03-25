import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {


  private emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  myForm: FormGroup;
  private formBuilder: FormBuilder = new FormBuilder

  constructor() {
  }

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailregex)
      ]],
      password: ['', [
        Validators.required,
      ]],
      academie: ['', [
        Validators.required,
      ]],
    })
  }

  onSubmit(value) {
    console.log("TODO do smothing", value)
    console.log("form valid ? ",  this.myForm.valid)
  }


  getErrorEmail(): string{
    return this.myForm.get('email').hasError('required') ? 'Ladresse mail est requise' :
      this.myForm.get('email').hasError('pattern') ? "Cette adresse mail n'est pas valide" : ''
  }
  getErrorPassword(): string{
    return this.myForm.get('password').hasError('required') ? 'Le mot de passe est requie' : ''
  }
  getErrorAcademie(): string{
    return this.myForm.get('academie').hasError('required') ? "Le nom de l'académie est requise" : ''
  }

}
