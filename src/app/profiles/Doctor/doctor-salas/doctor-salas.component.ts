import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { CardInfo } from '../../../models/cardInfo.model';
import { DataService } from '../../../services/data.service';
import { SalaModel } from '../../../models/sala.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-doctor-salas',
  templateUrl: './doctor-salas.component.html',
  styleUrls: ['./doctor-salas.component.css']
})
export class DoctorSalasComponent implements OnInit {

  formBusqueda: FormGroup;
  tarjetasCompletas: CardInfo[] = [];
  tarjetas: CardInfo[] = [];
  salas: SalaModel[];


  constructor(private formbuilder: FormBuilder,
              private dataservice: DataService,
              private user: UserService) {
    this.createForm();
    let numero = 0;
    this.dataservice.salas.forEach(
      (datos) => {
        const tar = new CardInfo(datos.especialidad, datos.id, datos.ubicacion, datos.estado, '');
        tar.succes = datos.disponible;
        tar.warning = !datos.disponible;
        if (datos.doctorId === user.user.id){
          tar.warning = false;
          tar.succes = false;
          tar.primary = true;
          tar.button = true;
          this.tarjetas.unshift(tar);
          numero ++;
          return 0;
        } else if (datos.disponible === true) {
          tar.button = true;
        }
        if ( tar.succes === true ){
          this.tarjetas.splice( numero, 0, tar);
        }
        if ( tar.warning === true ){
          this.tarjetas.push(tar);
        }
      }
    );

    this.tarjetasCompletas = this.tarjetas;

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

    const card: CardInfo [] = [];
    let numero = 0;

    busquedaSala.forEach((dato) => {
      if ( dato.primary === true){
        card.unshift(dato);
        numero ++;
      }
      if ( dato.succes === true ){
        card.splice( numero, 0, dato);
      }
      if ( dato.warning === true ){
        card.push(dato);
      }
    });

    this.tarjetas = card;

  }

  createForm(){
    this.formBusqueda = this.formbuilder.group( {
      id: ['', Validators.required]
    });
  }

}
