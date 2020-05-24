import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Paciente} from '../../../models/paciente.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-paciente-inicio',
  templateUrl: './paciente-inicio.component.html',
  styleUrls: ['./paciente-inicio.component.css']
})
export class PacienteInicioComponent implements OnInit {

  datos: Paciente;

  constructor( private user: UserService,
               private router: Router) {
    this.datos = this.user.user;
  }

  ngOnInit(): void {
  }

  verCaso( id: string){
    this.router.navigate(['/paciente/historialPaciente', id]);
  }

}
