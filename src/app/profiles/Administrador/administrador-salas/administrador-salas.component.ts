import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SalaModel} from '../../../models/sala.model';
import {CardInfo} from '../../../models/cardInfo.model';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-administrador-salas',
  templateUrl: './administrador-salas.component.html',
  styleUrls: ['./administrador-salas.component.css']
})
export class AdministradorSalasComponent implements OnInit {

  registrarSala: boolean;
  formularioIncompleto: boolean;
  idRegistrado: boolean;
  alertaCrear: boolean;
  editar: boolean;

  formaSala: FormGroup;
  cards: CardInfo[] = [];

  constructor( private formBuilder: FormBuilder,
               private data: DataService) {
    this.reset();

    data.salas.forEach( datos => {
      this.cards.push( new CardInfo(
        datos.especialidad,
        datos.id,
        `${datos.ubicacion}`,
        `${datos.estado}`,
        ``
      ));
    });
  }

  ngOnInit(): void {
  }

  reset() {
    this.registrarSala = false;
    this.formularioIncompleto = false;
    this.idRegistrado = false;
    this.alertaCrear = false;
    this.editar = false;

    this.createForm();
  }

  createForm() {
    this.formaSala = this.formBuilder.group({
      id: [`S_ ${this.data.salas.length}`, Validators.required],
      ubicacion: ['', Validators.required],
      especialidad: ['', Validators.required]
    });
  }

  submite(){
    const datos = this.formaSala.value;

    if (this.formaSala.invalid){
      this.alertaCrear = !this.alertaCrear;
      setTimeout(() => {
        this.alertaCrear = !this.alertaCrear;
      }, 4000);

      return Object.values( this.formaSala.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {

      if (this.editar){
        const sal = this.data.getSala(datos.id);
        sal.estado = datos.estado;
        sal.especialidad = datos.especialidad;
        sal.ubicacion = datos.ubicacion;

        const splitId = datos.id.split('_');
        this.cards[splitId[1]].header = datos.especialidad;
        this.cards[splitId[1]].id = datos.id;
        this.cards[splitId[1]].uno = datos.ubicacion;
        this.cards[splitId[1]].dos = datos.estado;

        this.reset();
        return 0;
      }

      this.data.crearSala(datos.id, datos.ubicacion, datos.especialidad);

      this.cards.push( new CardInfo(
        datos.especialidad,
        datos.id,
        `Disponible`,
        ``,
        ``
      ));

      this.reset();
    }
  }

  editInfo( id: string){

    const datos = this.data.getSala(id);
    this.formaSala = this.formBuilder.group({
      id: [datos.id, Validators.required],
      ubicacion: [datos.ubicacion, Validators.required],
      especialidad: [datos.especialidad, Validators.required],
      estado: [datos.estado, Validators.required]
    });

    this.editar = true;
  }

  get ubicacionValido(){
    const dato = 'ubicacion';
    return this.formaSala.get(dato).invalid && this.formaSala.get(dato).touched;
  }

  get especialidadValido(){
    const dato = 'especialidad';
    return this.formaSala.get(dato).invalid && this.formaSala.get(dato).touched;
  }

  get estadoValido(){
    const dato = 'estado';
    return this.formaSala.get(dato).invalid && this.formaSala.get(dato).touched;
  }
}
