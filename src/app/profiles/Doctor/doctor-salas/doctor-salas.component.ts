import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { CardInfo } from '../../../models/cardInfo.model';
import { DataService } from '../../../services/data.service';
import { SalaModel } from '../../../models/sala.model';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctor-salas',
  templateUrl: './doctor-salas.component.html',
  styleUrls: ['./doctor-salas.component.css']
})
export class DoctorSalasComponent implements OnInit {

  formBusqueda: FormGroup;
  formAgenda: FormGroup;

  agendarSala: boolean;
  formInvalid: boolean;
  id: string;

  tarjetasCompletas: CardInfo[] = [];
  tarjetas: CardInfo[] = [];
  salas: SalaModel[];


  constructor(private formbuilder: FormBuilder,
              private dataservice: DataService,
              private user: UserService,
              private router: Router) {

    this.reset();

  }

  reset(){
    this.agendarSala = false;
    this.formInvalid = false;

    this.createForm();

    let numero = 0;

    this.tarjetas = [];
    this.dataservice.salas.forEach(
      (data) => {
        let tar: CardInfo;

        if (!data.disponible ){
          tar = new CardInfo(data.especialidad, data.id, data.ubicacion, `${data.horarioInicio.toLocaleTimeString()} - ${data.horarioFin.toLocaleTimeString()}`, data.horarioInicio.toDateString());
        } else {
          tar = new CardInfo(data.especialidad, data.id, data.ubicacion, 'Disponible', '');
        }

        tar.succes = data.disponible;
        tar.warning = !data.disponible;
        if (data.doctorId === this.user.user.id){
          tar.warning = false;
          tar.succes = false;
          tar.primary = true;
          tar.button = true;
          this.tarjetas.unshift(tar);
          numero ++;
          return 0;
        }

        if ( tar.succes === true ){
          tar.button = true;
          this.tarjetas.splice( numero, 0, tar);
        }
        if ( tar.warning === true ){
          this.tarjetas.push(tar);
        }
      }
    );

    this.tarjetasCompletas = this.tarjetas;
  }

  agendarHorario() {
    const datos = this.formAgenda.value;

    console.log(datos);

    if (!this.formAgenda.valid) {
      this.formInvalid = !this.formInvalid;
      setTimeout(() => {
        this.formInvalid = !this.formInvalid;
      }, 4000);

      return 0;
    } else {
      const tiempo = datos.duracion.split(':');

      // tslint:disable-next-line:radix
      const dateCompare1 = new Date(datos.ano, parseInt(datos.mes) - 1, datos.dia, datos.hora, datos.minutos, 0, 0);
      // tslint:disable-next-line:max-line-length radix
      const dateCompare2 = new Date(datos.ano, parseInt(datos.mes) - 1, datos.dia, parseInt(datos.hora) + parseInt(tiempo[0]), parseInt(datos.minutos) + parseInt(tiempo[1]), 0, 0);

      this.dataservice.changeSalaReservada(this.id, this.user.user.id, dateCompare1, dateCompare2);

      this.reset();
    }
  }

  ngOnInit(): void {
  }

  buscarSala(){

    const datos = this.formBusqueda.value;

    const busquedaSala: CardInfo [] = [];

    this.tarjetasCompletas.forEach( (data) => {
      if (data.id.search(datos.id) !== -1 || data.header.search(datos.id) !== -1 ){
        busquedaSala.push(data);
      }
    });

  }

  get idValido(){
    const dato = 'idEmail';
    return this.formAgenda.get(dato).invalid && this.formAgenda.get(dato).touched;
  }

  get descValido2(){
    const dato = 'descripcion';
    return this.formAgenda.get(dato).invalid && this.formAgenda.get(dato).touched;
  }

  get diaValido2(){
    const dato = 'dia';
    return this.formAgenda.get(dato).invalid && this.formAgenda.get(dato).touched;
  }

  get mesValido2(){
    const dato = 'mes';
    return this.formAgenda.get(dato).invalid && this.formAgenda.get(dato).touched;
  }

  get anoValido2(){
    const dato = 'ano';
    return this.formAgenda.get(dato).invalid && this.formAgenda.get(dato).touched;
  }

  get horaValido2(){
    const dato = 'hora';
    return this.formAgenda.get(dato).invalid && this.formAgenda.get(dato).touched;
  }

  get minutoValido2(){
    const dato = 'hora';
    return this.formAgenda.get(dato).invalid && this.formAgenda.get(dato).touched;
  }

  get duracionValido2(){
    const dato = 'duracion';
    return this.formAgenda.get(dato).invalid && this.formAgenda.get(dato).touched;
  }

  createForm(){
    this.formBusqueda = this.formbuilder.group( {
      id: ['', Validators.required]
    });

    this.formAgenda = this.formbuilder.group({
      idEmail: ['', Validators.required],
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      ano: ['', Validators.required],
      hora: ['', Validators.required],
      minutos: ['', Validators.required],
      duracion: ['', Validators.required]
    });
  }

}
