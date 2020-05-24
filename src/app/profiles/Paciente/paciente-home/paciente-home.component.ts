import { Component, OnInit } from '@angular/core';
import {Navbar} from '../../../models/navbar.model';

@Component({
  selector: 'app-paciente-home',
  templateUrl: './paciente-home.component.html',
  styleUrls: ['./paciente-home.component.css']
})
export class PacienteHomeComponent implements OnInit {

  navbarRoutes: Navbar[] = [];

  constructor() {
    this.navbarRoutes = [new Navbar('Inicio', 'inicio')];
  }

  ngOnInit(): void {
  }

}
