import { Component, OnInit } from '@angular/core';
import {CardInfo} from '../../../models/cardInfo.model';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Phone} from '../../../models/phone.model';
import {Doctor} from '../../../models/doctor.model';

@Component({
  selector: 'app-administrador-secretario',
  templateUrl: './administrador-secretario.component.html',
  styleUrls: ['./administrador-secretario.component.css']
})
export class AdministradorSecretarioComponent implements OnInit {

  cards: CardInfo[] = [];

  formaSecretario: FormGroup;

  registrarSecretaria = false;
  alertaCrear = false;
  emailUsado = false;
  dorctorInvalid = false;

  constructor( private data: DataService,
               private router: Router,
               private formBuilder: FormBuilder) {

    this.data.secretarios.forEach( (secretario) => {

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
    this.router.navigate(['/administrador/secretario', id]);
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

      const respuesta = this.data.createSecretario(
        datos.nombre,
        datos.cumpleanos,
        datos.correo,
        [new Phone('Casa', `${datos.casa}`), new Phone('Celular', `${datos.personal}`), new Phone('Trabajo', `${datos.trabajo}`)],
        [datos.doctorId],
        datos.contrasena
      );

      if (respuesta === 'emailUsed') {
        this.emailUsado = !this.emailUsado;
        setTimeout(() => {
          this.emailUsado = !this.emailUsado;
        }, 4000);
      }

      const doctor = this.data.getUser( datos.doctorId );

      if (doctor instanceof Doctor){
        this.reset();

        this.cards = [];

        this.data.secretarios.forEach( (secretario) => {

          this.cards.push( new CardInfo(
            secretario.name,
            secretario.id,
            `${secretario.birthday}`,
            ``,
            `${secretario.phones[0].phone}`
          ));
        });
      }
      else {
        this.dorctorInvalid = !this.dorctorInvalid;
        setTimeout(() => {
          this.dorctorInvalid = !this.dorctorInvalid;
        }, 4000);
      }
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
      doctorId: ['', Validators.required],
      casa: ['', Validators.required],
      personal: [''],
      trabajo: [''],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

}
