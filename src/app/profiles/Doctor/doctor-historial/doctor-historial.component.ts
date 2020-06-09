import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../services/data.service';
import {Phone} from '../../../models/phone.model';
import {UserService} from '../../../services/user.service';
import {CardInfo} from '../../../models/cardInfo.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctor-historial',
  templateUrl: './doctor-historial.component.html',
  styleUrls: ['./doctor-historial.component.css']
})
export class DoctorHistorialComponent implements OnInit {

  forma: FormGroup;
  formaPaciente: FormGroup;

  buscarUsuario = false;
  crearUsuario = false;

  alertaCrear = false;
  emailUsado = false;
  usuarioInvalido = false;
  usuarioActivo = false;

  cards: CardInfo[] = [];
  cardsArchivado: CardInfo[] = [];
  cardsCompartido: CardInfo[] = [];

  constructor( private formBuilder: FormBuilder,
               private data: DataService,
               private user: UserService,
               private router: Router) {
    this.crearFormulario();

    user.user.casesID.forEach( (caso) => {
      const historial = this.data.getHistorialActual(caso);
      this.cards.push( new CardInfo(
         historial.pacienteNombre,
         historial.id,
         `Estado: ${historial.pacienteEstado}`,
         `En progreso ...`,
         `Consulta`
       ));
    });

    user.user.saveCasesID.forEach( (caso) => {
      const historial = this.data.getHistorialArchivados(caso);
      this.cardsArchivado.push( new CardInfo(
        historial.pacienteNombre,
        historial.id,
        `Estado: ${historial.pacienteEstado}`,
        `Archivado`,
        `Consulta`
      ));
    });

    user.user.shareCasesID.forEach( (caso) => {
      const historial = this.data.getHistorialArchivados(caso);
      this.cardsCompartido.push( new CardInfo(
        historial.pacienteNombre,
        historial.id,
        `Estado: ${historial.pacienteEstado}`,
        `Archivado`,
        `Consulta`
      ));
    });

    console.log(this.cards);
  }

  ngOnInit(): void {
  }

  reset(){
    this.buscarUsuario = false;
    this.crearUsuario = false;
    this.crearFormulario();
  }

  registrar(){

    const datos = this.formaPaciente.value;

    if ( this.formaPaciente.invalid ){

      this.alertaCrear = !this.alertaCrear;
      setTimeout(() => {
        this.alertaCrear = !this.alertaCrear;
      }, 4000);

      return Object.values( this.formaPaciente.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {

      const respuesta = this.data.createPaciente(
        datos.nombre,
        datos.sexo,
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
        const id = this.data.createHistorial(this.user.user.id, this.data.getUser(respuesta).id);
        this.router.navigate(['/doctor/historialPaciente', id]);
        console.log(this.user.user);
      }
    }
  }

  getHistorial( id: string){
    console.log(id);
    this.router.navigate(['/doctor/historialPaciente', id]);
  }

  getUser(){

    const datos = this.data.getUser( this.forma.value.idEmail );

    if ( datos == null){
      this.usuarioInvalido = !this.usuarioInvalido;
      setTimeout(() => {
        this.usuarioInvalido = !this.usuarioInvalido;
      }, 4000);

    } else {
      console.log(datos);
      const estado = this.data.createHistorial(this.user.user.id, datos.id);

      if ( estado === 'activo') {

        this.usuarioActivo = !this.usuarioActivo;
        setTimeout(() => {
          this.usuarioActivo = !this.usuarioActivo;
        }, 4000);

      } else {
        this.router.navigate(['/doctor/historialPaciente', estado]);
      }
    }
  }

  // Primer Formulario
  get idEmailValid(){
    return this.forma.get('idEmail').invalid && this.forma.get('idEmail').touched;
  }

  // Segundo Formulario
  get nombreValid(){
    const dato = 'nombre';
    return this.formaPaciente.get(dato).invalid && this.formaPaciente.get(dato).touched;
  }

  get cumpleanosValid(){
    const dato = 'cumpleanos';
    return this.formaPaciente.get(dato).invalid && this.formaPaciente.get(dato).touched;
  }

  get casaValid(){
    const dato = 'casa';
    return this.formaPaciente.get(dato).invalid && this.formaPaciente.get(dato).touched;
  }

  get correoValid(){
    const dato = 'correo';
    return this.formaPaciente.get(dato).invalid && this.formaPaciente.get(dato).touched;
  }

  get contrasenaValid(){
    const dato = 'contrasena';
    return this.formaPaciente.get(dato).invalid && this.formaPaciente.get(dato).touched;
  }

  get sexoValid(){
    const dato = 'sexo';
    return this.formaPaciente.get(dato).invalid && this.formaPaciente.get(dato).touched;
  }

  crearFormulario(){
    this.forma = this.formBuilder.group({
      idEmail : ['', Validators.required]
    });

    this.formaPaciente = this.formBuilder.group({
      nombre : ['', Validators.required],
      cumpleanos : ['', Validators.required],
      sexo : ['', Validators.required],
      casa : ['', Validators.required],
      personal : [''],
      trabajo : [''],
      correo : ['', Validators.required],
      contrasena : ['', Validators.required]
    });
  }

}
