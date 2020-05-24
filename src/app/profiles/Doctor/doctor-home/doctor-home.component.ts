import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../../models/navbar.model';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {

  navbarRoutes: Navbar[] = [];

  constructor() {
    this.navbarRoutes = [new Navbar('Inicio', 'inicio'), new Navbar('Historial', 'historial'),
                         new Navbar('Agenda', 'agenda')];
  }

  ngOnInit(): void {
  }

}
