import { Component, OnInit } from '@angular/core';
import {CardInfo} from '../../../models/cardInfo.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {Phone} from '../../../models/phone.model';
import {Doctor} from '../../../models/doctor.model';

@Component({
  selector: 'app-administrador-enfermero',
  templateUrl: './administrador-enfermero.component.html',
  styleUrls: ['./administrador-enfermero.component.css']
})
export class AdministradorEnfermeroComponent implements OnInit {

  cards: CardInfo[] = [];

  formaSecretario: FormGroup;

  registrarSecretaria = false;
  alertaCrear = false;
  emailUsado = false;
  dorctorInvalid = false;

  constructor( private data: DataService,
               private router: Router,
               private formBuilder: FormBuilder) {

    this.data.enfermero.forEach( (secretario) => {

      this.cards.push( new CardInfo(
        secretario.name,
        secretario.id,
        `${secretario.birthday}`,
        ``,
        `${secretario.phones[0].phone}`
      ));
    });

    this.createForm();
  }

  ngOnInit(): void {
  }

  reset(){
    this.registrarSecretaria = false;
    this.createForm();
  }

  getSecretaria(id: string){
    this.router.navigate(['/administrador/enfermero', id]);
  }

  registrar(){

    const datos = this.formaSecretario.value;
    console.log(this.formaSecretario);
    if ( this.formaSecretario.invalid ){

      this.alertaCrear = !this.alertaCrear;
      setTimeout(() => {
        this.alertaCrear = !this.alertaCrear;
      }, 4000);

      return Object.values( this.formaSecretario.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {

      const respuesta = this.data.createEnfermero(
        datos.nombre,
        datos.cumpleanos,
        datos.correo,
        [new Phone('Casa', `${datos.casa}`), new Phone('Celular', `${datos.personal}`), new Phone('Trabajo', `${datos.trabajo}`)],
        datos.contrasena
      );

      if (respuesta === 'emailUsed') {
        this.emailUsado = !this.emailUsado;
        setTimeout(() => {
          this.emailUsado = !this.emailUsado;
        }, 4000);
      }

      this.reset();

      this.cards = [];

      this.data.enfermero.forEach( (secretario) => {

        this.cards.push( new CardInfo(
          secretario.name,
          secretario.id,
          `${secretario.birthday}`,
          ``,
          `${secretario.phones[0].phone}`
        ));
      });
    }

  }

  get nombreValid(){
    const dato = 'nombre';
    return this.formaSecretario.get(dato).invalid && this.formaSecretario.get(dato).touched;
  }

  get cumpleanosValid(){
    const dato = 'cumpleanos';
    return this.formaSecretario.get(dato).invalid && this.formaSecretario.get(dato).touched;
  }

  get casaValid(){
    const dato = 'casa';
    return this.formaSecretario.get(dato).invalid && this.formaSecretario.get(dato).touched;
  }

  get correoValid(){
    const dato = 'correo';
    return this.formaSecretario.get(dato).invalid && this.formaSecretario.get(dato).touched;
  }

  get contrasenaValid(){
    const dato = 'contrasena';
    return this.formaSecretario.get(dato).invalid && this.formaSecretario.get(dato).touched;
  }

  get doctorId(){
    const dato = 'doctorId';
    return this.formaSecretario.get(dato).invalid && this.formaSecretario.get(dato).touched;
  }

  createForm(){
    this.formaSecretario = this.formBuilder.group({
      nombre: ['', Validators.required],
      cumpleanos: ['', Validators.required],
      casa: ['', Validators.required],
      personal: [''],
      trabajo: [''],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

}
