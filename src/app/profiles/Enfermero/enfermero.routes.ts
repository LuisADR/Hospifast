import {Routes} from '@angular/router';
import {EnfermeroInicioComponent} from './enfermero-inicio/enfermero-inicio.component';
import {EnfermeroEquipoComponent} from './enfermero-equipo/enfermero-equipo.component';

export const ENFERMERO_ROUTES: Routes = [
  {path: 'equipo', component: EnfermeroEquipoComponent},
  {path: 'inicio', component: EnfermeroInicioComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];
