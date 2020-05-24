import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import {CardInfo} from '../../models/cardInfo.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() datos: CardInfo[];
  @Input() titulo: string;
  @Input() agregar: boolean;
  @Input() agregarUrl: string;

  @Output() id: EventEmitter<string>;

  constructor( private router: Router,
               private activatedRouter: ActivatedRoute,
               public dataService: DataService) {
    this.id = new EventEmitter();
  }

  getId( i: number){
    this.id.emit(this.datos[i].id);
  }

  ngOnInit(): void {
  }

}
