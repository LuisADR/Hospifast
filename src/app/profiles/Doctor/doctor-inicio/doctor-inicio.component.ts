import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Doctor} from '../../../models/doctor.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-doctor-inicio',
  templateUrl: './doctor-inicio.component.html',
  styleUrls: ['./doctor-inicio.component.css']
})
export class DoctorInicioComponent implements OnInit {

  datos: Doctor;

  constructor( private user: UserService,
               private data: DataService,
               private router: Router,
               private activatedRoute: ActivatedRoute) {

    this.datos = this.user.user;
    if (this.user.type === 'admin'){
      this.activatedRoute.params.subscribe((param) => {
        this.datos = this.data.getUser(param.id);
      });
    }
  }

  ngOnInit(): void {
  }

  verCaso( id: string){
    this.router.navigate(['/doctor/historialPaciente', id]);
  }
}
