import { Injectable } from '@angular/core';
import {Administrador} from '../models/administrador.model';
import {Doctor} from '../models/doctor.model';
import {Paciente} from '../models/paciente.model';
import {Secretario} from '../models/secretario.model';
import {DataService} from './data.service';
import {Router} from '@angular/router';
import {FarmaciaModel} from '../models/farmacia.model';
import {EnfermeroModel} from '../models/enfermero.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any;
  type: string;

  constructor( private data: DataService,
               private router: Router) { }

  // Iniciamos secion y almacenamos el usuario
  login(idEmail: string, password: string){
    const usuario = this.data.getUser(idEmail);

    if (usuario == null ){
      return false;
    }

    // Comprobamos que tipo de usuario es
    if (usuario.password === password){
      const splitId = idEmail.split('_');

      if ( usuario instanceof Administrador ) {
        this.user = usuario;
        this.type = 'admin';
        console.log(this.isAdmin());
        return 'admin';
      }
      if ( usuario instanceof Doctor) {
        this.user = usuario;
        this.type = 'doctor';
        return 'doctor';
      }
      if ( usuario instanceof Paciente) {
        this.user = usuario;
        this.type = 'paciente';
        return 'paciente';
      }
      if ( usuario instanceof Secretario) {
        this.user = usuario;
        this.type = 'secretario';
        return 'secretario';
      }
      if ( usuario instanceof FarmaciaModel) {
        this.user = usuario;
        this.type = 'farmacia';
        return 'farmacia';
      }

      if ( usuario instanceof EnfermeroModel) {
        this.user = usuario;
        this.type = 'enfermero';
        return 'enfermero';
      }
    }

    return false;
  }

  // Cerramos sesion
  logout(){
    this.router.navigateByUrl('/home');
    this.user = false;
    this.type = 'null';
    console.log(this.isAdmin());
  }



  isAdmin(){
    return this.type === 'admin';
  }

  isDoctor(){
    return this.type === 'doctor';
  }

  isPaciente(){
    return this.type === 'paciente';
  }

  isSecretario(){
    return this.type === 'secretario';
  }

  isFarmacia(){
    return this.type === 'farmacia';
  }
}
