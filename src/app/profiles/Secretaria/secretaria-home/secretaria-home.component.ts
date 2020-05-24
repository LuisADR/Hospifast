import { Component, OnInit } from '@angular/core';
import {Navbar} from '../../../models/navbar.model';

@Component({
  selector: 'app-secretaria-home',
  templateUrl: './secretaria-home.component.html',
  styleUrls: ['./secretaria-home.component.css']
})
export class SecretariaHomeComponent implements OnInit {

  navbarRoutes: Navbar [];

  constructor() {
    this.navbarRoutes = [new Navbar('Inicio', 'inicio'), new Navbar('Agenda', 'agenda')];
  }

  ngOnInit(): void {
  }

}
