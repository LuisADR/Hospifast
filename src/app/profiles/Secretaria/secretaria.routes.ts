import {Routes} from '@angular/router';
import {SecretarioInicioComponent} from './secretario-inicio/secretario-inicio.component';
import {DoctorAgendaComponent} from '../Doctor/doctor-agenda/doctor-agenda.component';

export const SECRETARIA_ROUTES: Routes = [
  {path: 'agenda/:id', component: DoctorAgendaComponent},
  {path: 'inicio', component: SecretarioInicioComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
