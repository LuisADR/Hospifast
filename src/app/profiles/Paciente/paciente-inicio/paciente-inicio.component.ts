import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Paciente} from '../../../models/paciente.model';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from "../../../services/data.service";
import {Doctor} from "../../../models/doctor.model";

@Component({
  selector: 'app-paciente-inicio',
  templateUrl: './paciente-inicio.component.html',
  styleUrls: ['./paciente-inicio.component.css']
})
export class PacienteInicioComponent implements OnInit {

  datos: Paciente;
  compartir: boolean;
  compartido: boolean;
  nullDoctor: boolean;
  formBusquedaD: FormGroup;

  constructor( private user: UserService,
               private router: Router, private formBuilder: FormBuilder, private data: DataService) {
    this.datos = this.user.user;
    this.compartido = false;
    this.nullDoctor = false;
    this.reset();
  }

  ngOnInit(): void {
  }

  reset(){
    this.compartir = false;
    this.createForm();
  }
  verCaso( id: string){
    this.router.navigate(['/paciente/historialPaciente', id]);
  }

  agregarDoctor( id: string){
    const doctor = this.data.getUser(this.formBusquedaD.value.id);
    let repetido = false;

    if (doctor instanceof Doctor){
      doctor.shareCasesID.forEach( ids => {
        if (ids === id){
          repetido = true;
        }
      });

      doctor.saveCasesID.forEach( ids => {
        if (ids === id){
          repetido = true;
        }
      });

      if (repetido){
        this.compartido = !this.compartido;
        setTimeout(() => {
          this.compartido = !this.compartido;
        }, 4000);
        this.reset();
        return 0;
      } else if (!repetido){
        doctor.shareCasesID.push(id);
        console.log(id);
        this.compartido = !this.compartido;
        setTimeout(() => {
          this.compartido = !this.compartido;
        }, 4000);
        this.reset();
        return 0;
      }
    } else {
      this.nullDoctor = !this.nullDoctor;
      setTimeout(() => {
        this.nullDoctor = !this.nullDoctor;
      }, 4000);
      return 0;
    }
  }

  createForm(){
    this.formBusquedaD = this.formBuilder.group( {
      id: ['', Validators.required]
    });
  }



}
