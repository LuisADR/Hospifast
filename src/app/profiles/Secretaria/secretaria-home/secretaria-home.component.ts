import { Component, OnInit } from '@angular/core';
import {Navbar} from '../../../models/navbar.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-secretaria-home',
  templateUrl: './secretaria-home.component.html',
  styleUrls: ['./secretaria-home.component.css']
})
export class SecretariaHomeComponent implements OnInit {

  navbarRoutes: Navbar [];

  constructor( private user: UserService) {
    this.navbarRoutes = [new Navbar('Inicio', 'inicio'), new Navbar('Agenda', 'agenda', this.user.user.doctorid[0]),
                         new Navbar('Pago', 'pago')];
  }

  ngOnInit(): void {
  }

}
