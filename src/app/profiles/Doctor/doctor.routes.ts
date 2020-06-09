import {Routes} from '@angular/router';
import {DoctorAgendaComponent} from './doctor-agenda/doctor-agenda.component';
import {DoctorHistorialComponent} from './doctor-historial/doctor-historial.component';
import {DoctorInicioComponent} from './doctor-inicio/doctor-inicio.component';
import {HistorialComponent} from '../../components/historial/historial.component';
import {DoctorSalasComponent} from './doctor-salas/doctor-salas.component';


export const DOCTOR_ROUTES: Routes = [
  {path: 'historial', component: DoctorHistorialComponent},
  {path: 'historialPaciente/:id', component: HistorialComponent},
  {path: 'agenda', component: DoctorAgendaComponent},
  {path: 'inicio', component: DoctorInicioComponent},
  {path: 'salas', component: DoctorSalasComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
