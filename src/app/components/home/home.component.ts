import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Phone} from '../../models/phone.model';
import {DataService} from '../../services/data.service';
import {DateValidator} from '../../services/DateValidator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  formaPaciente: FormGroup;
  forma: FormGroup;
  alert = false;

  sexo: string [];

  registrar = false;
  alertaCrear = false;
  emailUsado = false;
  usuarioInvalido = false;
  usuarioActivo = false;

  constructor( private formBuilder: FormBuilder,
               private userService: UserService,
               private router: Router,
               private data: DataService) {
    this.crearFormulario();
    this.sexo = [ 'Hombre', 'Mujer'];
  }

  ngOnInit(): void {
  }

  get idEmailValid(){
    return this.forma.get('idEmail').invalid && this.forma.get('idEmail').touched;
  }

  get passwordValid(){
    return this.forma.get('contrasena').invalid && this.forma.get('contrasena').touched;
  }

  crearFormulario(){
    this.forma = this.formBuilder.group({
      idEmail : ['', Validators.required],
      contrasena: ['', Validators.required]
    });

    this.formaPaciente = this.formBuilder.group({
      nombre : ['', Validators.required],
      cumpleanos : new FormControl('', Validators.required),
      sexo : new FormControl( '', Validators.required),
      casa : ['', Validators.required],
      personal : [''],
      trabajo : [''],
      correo : ['', Validators.required, Validators.email],
      contrasena : ['', Validators.required]
    });
  }

  // Formulario 2

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

  registrarUsuario(){

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
        this.userService.login(datos.correo, datos.contrasena);
        this.router.navigateByUrl('/paciente');
      }
    }
  }

  iniciar(){

    const datos = this.forma.value;

    if ( this.forma.invalid ){
      return Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {
      const user = this.userService.login(datos.idEmail, datos.contrasena);

      if (user === false){
        this.alert = !this.alert;
        setTimeout(() => {
          this.alert = !this.alert;
        }, 4000);
      }

      switch ( user ) {
        case 'admin':
          console.log('admin login');
          this.router.navigateByUrl('/administrador');
          break;
        case 'doctor':
          console.log('doctor login');
          this.router.navigateByUrl('/doctor');
          break;
        case 'paciente':
          console.log('paciente login');
          this.router.navigateByUrl('/paciente');
          break;
        case 'secretario':
          console.log('secretario login');
          this.router.navigateByUrl('/secretario');
          break;
        case 'farmacia':
          console.log('farmacia login');
          this.router.navigateByUrl('/farmacia');
          break;
        case 'enfermero':
          console.log('enfermero login');
          this.router.navigateByUrl('/enfermero');
          break;
      }

    }

  }

}
