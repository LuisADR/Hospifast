import { Component, OnInit } from '@angular/core';
import {Doctor} from '../../../models/doctor.model';
import {UserService} from '../../../services/user.service';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EnfermeroModel} from '../../../models/enfermero.model';

@Component({
  selector: 'app-enfermero-inicio',
  templateUrl: './enfermero-inicio.component.html',
  styleUrls: ['./enfermero-inicio.component.css']
})
export class EnfermeroInicioComponent implements OnInit {

  datos: EnfermeroModel;
  doctor: Doctor[] = [];

  constructor( public user: UserService,
               public data: DataService,
               private activatedRoute: ActivatedRoute, private router: Router) {
    this.datos = this.user.user;

    if (user.type === 'admin'){
      this.activatedRoute.params.subscribe((param) => {
        this.datos = this.data.getUser(param.id);
      });
    }
  }

  ngOnInit(): void {
  }

  verAgenda( id: string) {
    this.router.navigate(['/secretario/agenda', id]);
  }

}
