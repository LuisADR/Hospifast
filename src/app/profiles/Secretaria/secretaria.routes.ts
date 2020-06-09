import {Routes} from '@angular/router';
import {SecretarioInicioComponent} from './secretario-inicio/secretario-inicio.component';
import {DoctorAgendaComponent} from '../Doctor/doctor-agenda/doctor-agenda.component';
import {SecretariaPagoComponent} from './secretaria-pago/secretaria-pago.component';

export const SECRETARIA_ROUTES: Routes = [
  {path: 'agenda/:id', component: DoctorAgendaComponent},
  {path: 'inicio', component: SecretarioInicioComponent},
  {path: 'pago', component: SecretariaPagoComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
