import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import {CardInfo} from '../../models/cardInfo.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() datos: CardInfo[];

  @Output() id: EventEmitter<string>;

  constructor( private router: Router,
               private activatedRouter: ActivatedRoute,
               public dataService: DataService,
               public user: UserService) {
    this.id = new EventEmitter();
  }

  getId( i: number){
    this.id.emit(this.datos[i].id);
  }



  ngOnInit(): void {
  }

  reservar(id: string){
    this.dataService.changeSalaReservada(id, this.user.user.id);

    const card: CardInfo [] = [];
    let numero = 0;

    this.datos.forEach((dato) => {
      if (dato.id === id){
        dato.dos = 'Reservado';
        dato.primary = true;
        dato.succes = false;
      }
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

    this.datos = card;

  }

  liberar(id: string){
    this.dataService.changeSalaDisponible(id);

    const card: CardInfo [] = [];
    let numero = 0;

    this.datos.forEach((dato) => {
      if (dato.id === id){
        dato.dos = 'Disponible';
        dato.primary = false;
        dato.succes = true;
      }
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

    this.datos = card;
  }



}
