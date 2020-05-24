import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ADMINISTRADOR_ROUTES } from './profiles/Administrador/administrador.routes';
import { DOCTOR_ROUTES } from './profiles/Doctor/doctor.routes';
import { PACIENTE_ROUTES } from './profiles/Paciente/paciente.routes';
import { SECRETARIA_ROUTES } from './profiles/Secretaria/secretaria.routes';
import { AdministradorHomeComponent } from './profiles/Administrador/administrador-home/administrador-home.component';
import { DoctorHomeComponent } from './profiles/Doctor/doctor-home/doctor-home.component';
import {PacienteHomeComponent} from './profiles/Paciente/paciente-home/paciente-home.component';
import {AdminGuard} from './services/admin.guard';
import {DoctorGuard} from './services/doctor.guard';
import {PacienteGuard} from './services/paciente.guard';
import {SecretariaHomeComponent} from './profiles/Secretaria/secretaria-home/secretaria-home.component';
import {SecretarioGuard} from './services/secretario.guard';
import {FarmaciaHomeComponent} from './profiles/Farmacia/farmacia-home/farmacia-home.component';
import {FARMACIA_ROUTES} from './profiles/Farmacia/farmacia.routes';
import {EnfermeroHomeComponent} from './profiles/Enfermero/enfermero-home/enfermero-home.component';
import {ENFERMERO_ROUTES} from './profiles/Enfermero/enfermero.routes';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {
      path: 'administrador',
      component: AdministradorHomeComponent,
      children: ADMINISTRADOR_ROUTES,
      canActivate: [AdminGuard]
    },
    {
      path: 'doctor',
      component: DoctorHomeComponent,
      children: DOCTOR_ROUTES,
      canActivate: [DoctorGuard]
    },
    {
      path: 'paciente',
      component: PacienteHomeComponent,
      children: PACIENTE_ROUTES,
      canActivate: [PacienteGuard]
    },
    {
      path: 'secretario',
      component: SecretariaHomeComponent,
      children: SECRETARIA_ROUTES,
      canActivate: [SecretarioGuard]
    },
    {
      path: 'farmacia',
      component: FarmaciaHomeComponent,
      children: FARMACIA_ROUTES
    },
  {
    path: 'enfermero',
    component: EnfermeroHomeComponent,
    children: ENFERMERO_ROUTES
  },
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
