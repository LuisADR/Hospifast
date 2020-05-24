import { Component, OnInit } from '@angular/core';
import {Navbar} from '../../../models/navbar.model';

@Component({
  selector: 'app-administrador-home',
  templateUrl: './administrador-home.component.html',
  styleUrls: ['./administrador-home.component.css']
})
export class AdministradorHomeComponent implements OnInit {

  navbarRoutes: Navbar[] = [];

  constructor() {
    this.navbarRoutes = [ new Navbar('Doctores', 'doctores'),
                          new Navbar('Secretarios', 'secretarios'),
                          new Navbar('Enfermeros', 'enfermeros'),
                          new Navbar('Salas', 'salas')];
  }

  ngOnInit(): void {
  }

}
