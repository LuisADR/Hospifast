import {Routes} from '@angular/router';
import {AdministradorDoctorComponent} from './administrador-doctor/administrador-doctor.component';
import {AdministradorSecretarioComponent} from './administrador-secretario/administrador-secretario.component';
import {DoctorInicioComponent} from '../Doctor/doctor-inicio/doctor-inicio.component';
import {SecretarioInicioComponent} from '../Secretaria/secretario-inicio/secretario-inicio.component';
import {AdministradorSalasComponent} from './administrador-salas/administrador-salas.component';
import {AdministradorEnfermeroComponent} from './administrador-enfermero/administrador-enfermero.component';
import {EnfermeroInicioComponent} from '../Enfermero/enfermero-inicio/enfermero-inicio.component';

export const ADMINISTRADOR_ROUTES: Routes  = [
  {path: 'doctores', component: AdministradorDoctorComponent},
  {path: 'doctor/:id', component: DoctorInicioComponent},
  {path: 'secretarios', component: AdministradorSecretarioComponent},
  {path: 'secretario/:id', component: SecretarioInicioComponent},
  {path: 'enfermeros', component: AdministradorEnfermeroComponent},
  {path: 'enfermero/:id', component: EnfermeroInicioComponent},
  {path: 'salas', component: AdministradorSalasComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'doctores'}
  ];


