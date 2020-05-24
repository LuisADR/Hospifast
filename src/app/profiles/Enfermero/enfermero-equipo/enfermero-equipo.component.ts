import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-enfermero-equipo',
  templateUrl: './enfermero-equipo.component.html',
  styleUrls: ['./enfermero-equipo.component.css']
})
export class EnfermeroEquipoComponent implements OnInit {

  registrarEquipo: boolean;
  alertaCrear: boolean;

  formEquipo: FormGroup;

  constructor( public data: DataService,
               private formBuilder: FormBuilder) {
    this.reset();
  }

  ngOnInit(): void {
  }

  reset(){
    this.registrarEquipo = false;
    this.alertaCrear = false;

    this.createForm();
  }

  submite(){
    const datos = this.formEquipo.value;

    if (this.formEquipo.invalid){
      this.alertaCrear = !this.alertaCrear;
      setTimeout(() => {
        this.alertaCrear = !this.alertaCrear;
      }, 4000);

      return Object.values( this.formEquipo.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {
      this.data.createEquipo(datos.nombre, datos.ubicacion);

      this.reset();
    }
  }

  get ubicacionValido(){
    const dato = 'ubicacion';
    return this.formEquipo.get(dato).invalid && this.formEquipo.get(dato).touched;
  }

  get nombreValid(){
    const dato = 'nombre';
    return this.formEquipo.get(dato).invalid && this.formEquipo.get(dato).touched;
  }

  createForm() {
    this.formEquipo = this.formBuilder.group({
      id: [`EM_ ${this.data.lastIdEquipo}`, Validators.required],
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required]
    });
  }

}
