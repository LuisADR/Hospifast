import {Routes} from '@angular/router';
import {PacienteAgendaComponent} from './paciente-agenda/paciente-agenda.component';
import {PacienteInicioComponent} from './paciente-inicio/paciente-inicio.component';
import {HistorialComponent} from '../../components/historial/historial.component';

export const PACIENTE_ROUTES: Routes = [
  {path: 'agenda', component: PacienteAgendaComponent},
  {path: 'inicio', component: PacienteInicioComponent},
  {path: 'historialPaciente/:id', component: HistorialComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
