import {Component, Input, OnInit} from '@angular/core';
import {Navbar} from '../../../models/navbar.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() rutas: Navbar[];

  constructor( public user: UserService) { }

  ngOnInit(): void {
  }

}
