import {Routes} from '@angular/router';
import {FarmaciaTablaComponent} from './farmacia-tabla/farmacia-tabla.component';
import {FarmaciaPacienteComponent} from './farmacia-paciente/farmacia-paciente.component';


export const FARMACIA_ROUTES: Routes = [
  {path: 'medicamentos', component: FarmaciaTablaComponent},
  {path: 'paciente', component: FarmaciaPacienteComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'medicamentos'}
];
