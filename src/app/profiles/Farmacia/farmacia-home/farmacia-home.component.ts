import { Component, OnInit } from '@angular/core';
import {Navbar} from '../../../models/navbar.model';

@Component({
  selector: 'app-farmacia-home',
  templateUrl: './farmacia-home.component.html',
  styleUrls: ['./farmacia-home.component.css']
})
export class FarmaciaHomeComponent implements OnInit {

  navbarRoutes: Navbar[] = [];

  constructor() {
    this.navbarRoutes = [new Navbar('Medicamentos', 'medicamentos')];
  }

  ngOnInit(): void {
  }

}
