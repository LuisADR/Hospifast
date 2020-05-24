import { Component, OnInit } from '@angular/core';
import {Navbar} from '../../../models/navbar.model';

@Component({
  selector: 'app-enfermero-home',
  templateUrl: './enfermero-home.component.html',
  styleUrls: ['./enfermero-home.component.css']
})
export class EnfermeroHomeComponent implements OnInit {

  navbarRoutes: Navbar [];

  constructor() {
    this.navbarRoutes = [new Navbar('Inicio', 'inicio'), new Navbar('Equipo Medico', 'equipo')];
  }

  ngOnInit(): void {
  }

}
