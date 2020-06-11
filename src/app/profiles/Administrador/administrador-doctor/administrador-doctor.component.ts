import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {CardInfo} from '../../../models/cardInfo.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Phone} from '../../../models/phone.model';

@Component({
  selector: 'app-administrador-doctor',
  templateUrl: './administrador-doctor.component.html',
  styleUrls: ['./administrador-doctor.component.css']
})
export class AdministradorDoctorComponent implements OnInit {

  cards: CardInfo[] = [];
  sexo: string [];

  formaDoctor: FormGroup;

  registrarDoctor = false;
  alertaCrear = false;
  emailUsado = false;

  constructor( public data: DataService,
               private router: Router,
               private formBuilder: FormBuilder) {

    this.sexo = [ 'Hombre', 'Mujer'];

    this.data.doctores.forEach( (doctor) => {

      this.cards.push( new CardInfo(
        doctor.name,
        doctor.id,
        `Especialidad: ${doctor.specialties.join(', ')}`,
        ``,
        `${doctor.phones[0].phone}`
      ));
    });

    this.createForm();

  }

  ngOnInit(): void {
  }

  reset(){
    this.registrarDoctor = false;
    this.createForm();
  }

  getDoctor( id: string ){
    this.router.navigate(['/administrador/doctor', id]);
  }

  registrar(){
    const datos = this.formaDoctor.value;
    console.log(this.formaDoctor);
    if ( this.formaDoctor.invalid ){

      this.alertaCrear = !this.alertaCrear;
      setTimeout(() => {
        this.alertaCrear = !this.alertaCrear;
      }, 4000);

      return Object.values( this.formaDoctor.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {

      const respuesta = this.data.createDoctor(
        datos.nombre,
        [datos.especialidad1, datos.especialidad2, datos.especialidad3],
        datos.cumpleanos,
        [new Phone('Casa', `${datos.casa}`), new Phone('Celular', `${datos.personal}`), new Phone('Trabajo', `${datos.trabajo}`)],
        datos.correo,
        datos.contrasena
      );

      if (respuesta === 'emailUsed') {
        this.emailUsado = !this.emailUsado;
        setTimeout(() => {
          this.emailUsado = !this.emailUsado;
        }, 4000);
      } else {
        this.reset();

        this.cards = [];

        this.data.doctores.forEach( (doctor) => {

          this.cards.push( new CardInfo(
            doctor.name,
            doctor.id,
            `Especialidad: ${doctor.specialties.join(', ')}`,
            ``,
            `${doctor.phones[0].phone}`
          ));
        });

      }
    }
  }

  get nombreValid(){
    const dato = 'nombre';
    return this.formaDoctor.get(dato).invalid && this.formaDoctor.get(dato).touched;
  }

  get cumpleanosValid(){
    const dato = 'cumpleanos';
    return this.formaDoctor.get(dato).invalid && this.formaDoctor.get(dato).touched;
  }

  get casaValid(){
    const dato = 'casa';
    return this.formaDoctor.get(dato).invalid && this.formaDoctor.get(dato).touched;
  }

  get correoValid(){
    const dato = 'correo';
    return this.formaDoctor.get(dato).invalid && this.formaDoctor.get(dato).touched;
  }

  get contrasenaValid(){
    const dato = 'contrasena';
    return this.formaDoctor.get(dato).invalid && this.formaDoctor.get(dato).touched;
  }

  get sexoValid(){
    const dato = 'sexo';
    return this.formaDoctor.get(dato).invalid && this.formaDoctor.get(dato).touched;
  }

  get especialidadValid1(){
    const dato = 'especialidad1';
    return this.formaDoctor.get(dato).invalid && this.formaDoctor.get(dato).touched;
  }

  createForm(){
    this.formaDoctor = this.formBuilder.group({
      nombre: ['', Validators.required],
      cumpleanos: ['', Validators.required],
      sexo: new FormControl(),
      casa: ['', Validators.required],
      personal: [''],
      trabajo: [''],
      correo: ['', Validators.required, Validators.email],
      contrasena: ['', Validators.required],
      especialidad1: ['', Validators.required],
      especialidad2: [''],
      especialidad3: [''],
    });
  }
}
