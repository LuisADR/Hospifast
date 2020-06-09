import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../../services/data.service';
import {CardInfo} from '../../../models/cardInfo.model';
import {UserService} from '../../../services/user.service';
import {Historial} from '../../../models/historial.model';


@Component({
  selector: 'app-secretaria-pago',
  templateUrl: './secretaria-pago.component.html',
  styleUrls: ['./secretaria-pago.component.css']
})
export class SecretariaPagoComponent implements OnInit {

  formBusqueda: FormGroup;

  informePago: boolean;
  pagoTerminado: boolean;

  informe: Historial;
  index: number;
  precio: number;

  cardInfoCompleta: CardInfo [] = [];
  cardInfoFiltrado: CardInfo [] = [];

  constructor( private formBuilder: FormBuilder,
               private data: DataService,
               private user: UserService) {
    this.pagoTerminado = false;
    this.informePago = false;
    this.createForm();

    this.data.casosArchivados.forEach( caso => {
      this.user.user.doctorid.forEach( doctor => {
        if (doctor === caso.doctorId){

          if ( !caso.pago ) {
            this.cardInfoCompleta.push(new CardInfo(caso.pacienteNombre, caso.id, 'Consulta General',
              'Pago Pendiente', ''));
            this.cardInfoFiltrado.push(new CardInfo(caso.pacienteNombre, caso.id, 'Consulta General',
              'Pago Pendiente', ''));
            console.log(caso);
          } else {
            this.cardInfoCompleta.push(new CardInfo(caso.pacienteNombre, caso.id, 'Consulta General',
              'Pagado', ''));
          }
        }
      });
    });
  }

  ngOnInit(): void {
  }

  reset(){
    this.informePago = false;

    this.cardInfoFiltrado = [];

    this.cardInfoCompleta.forEach( datos => {
      if (datos.dos === 'Pago Pendiente'){
        this.cardInfoFiltrado.push(datos);
      }
    });

    this.createForm();
  }

  crearInforme(id: string){
    this.informe = this.data.getHistorialArchivados(id);

    console.log(this.informe.medicamentosSurtidos);

    let precioFinal = 0;
    this.informe.medicamentosSurtidos.forEach(med => {
      precioFinal = precioFinal + med.precio;
    });

    if (!this.informe.pagoConsulta){
      precioFinal = precioFinal + 300;
    }

    this.precio = precioFinal;

    this.informePago = true;
  }

  pagar() {
    let card: CardInfo;
    this.informe.pagoConsulta = true;
    this.informe.medicamentosSurtidosP = this.informe.medicamentosSurtidos;
    this.informe.medicamentosSurtidos = [];

    this.informe.pago = true;

    this.cardInfoCompleta.forEach( (datos) => {
      if (datos.id === this.informe.id){
        datos.dos = 'Pagado';
        card = datos;
      }
    });

    this.cardInfoFiltrado.splice(this.cardInfoFiltrado.indexOf(card), 1);

    this.reset();

    this.pagoTerminado = !this.pagoTerminado;
    setTimeout(() => {
      this.pagoTerminado = !this.pagoTerminado;
    }, 4000);

  }


  buscarHistorial(){
    const busqueda = this.formBusqueda.value.busqueda;

    this.cardInfoFiltrado = [];

    this.cardInfoCompleta.forEach( datos => {
      if (datos.id === busqueda){
        this.cardInfoFiltrado.push(datos);
      }
    });
  }

  createForm(){
    this.formBusqueda = this.formBuilder.group({
      busqueda: ['']
    });
  }

}
