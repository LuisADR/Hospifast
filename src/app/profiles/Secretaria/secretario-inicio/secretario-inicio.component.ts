import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Secretario} from '../../../models/secretario.model';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Doctor} from '../../../models/doctor.model';

@Component({
  selector: 'app-secretario-inicio',
  templateUrl: './secretario-inicio.component.html',
  styleUrls: ['./secretario-inicio.component.css']
})
export class SecretarioInicioComponent implements OnInit {

  datos: Secretario;
  doctor: Doctor[] = [];

  constructor( public user: UserService,
               public data: DataService,
               private activatedRoute: ActivatedRoute, private router: Router) {
    this.datos = this.user.user;

    if (user.type === 'admin'){
      this.activatedRoute.params.subscribe((param) => {
        this.datos = this.data.getUser(param.id);
      });

      this.datos.doctorid.forEach( (doctor) => {
        this.doctor.push(this.data.getUser(doctor));
      });
    } else {
      this.datos.doctorid.forEach( (doctor) => {
        this.doctor.push(this.data.getUser(doctor));
      });
    }
  }

  ngOnInit(): void {
  }

  verAgenda( id: string) {
    this.router.navigate(['/secretario/agenda', id]);
  }

}
