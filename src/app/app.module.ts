import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './components/share/nav/nav.component';
import { UserComponent } from './components/user/user.component';
import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { CardsComponent } from './components/cards/cards.component';
import { ShortNamePipe } from './pipes/short-name.pipe';
import { ConcatenarPipe } from './pipes/concatenar.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { AdministradorHomeComponent } from './profiles/Administrador/administrador-home/administrador-home.component';
import { DoctorHomeComponent } from './profiles/Doctor/doctor-home/doctor-home.component';
import { PacienteHomeComponent } from './profiles/Paciente/paciente-home/paciente-home.component';
import { SecretariaHomeComponent } from './profiles/Secretaria/secretaria-home/secretaria-home.component';
import { DataService } from './services/data.service';
import { AdministradorDoctorComponent } from './profiles/Administrador/administrador-doctor/administrador-doctor.component';
import { AdministradorSecretarioComponent } from './profiles/Administrador/administrador-secretario/administrador-secretario.component';
import { DoctorHistorialComponent } from './profiles/Doctor/doctor-historial/doctor-historial.component';
import { DoctorPacientesComponent } from './profiles/Doctor/doctor-pacientes/doctor-pacientes.component';
import { DoctorAgendaComponent } from './profiles/Doctor/doctor-agenda/doctor-agenda.component';
import { PacienteAgendaComponent } from './profiles/Paciente/paciente-agenda/paciente-agenda.component';
import { SecretarioAgendaComponent } from './profiles/Secretaria/secretario-agenda/secretario-agenda.component';
import { PacienteInicioComponent } from './profiles/Paciente/paciente-inicio/paciente-inicio.component';
import { DoctorInicioComponent } from './profiles/Doctor/doctor-inicio/doctor-inicio.component';
import { SecretarioInicioComponent } from './profiles/Secretaria/secretario-inicio/secretario-inicio.component';
import { HistorialComponent } from './components/historial/historial.component';
import { FarmaciaHomeComponent } from './profiles/Farmacia/farmacia-home/farmacia-home.component';
import { FarmaciaTablaComponent } from './profiles/Farmacia/farmacia-tabla/farmacia-tabla.component';
import { AdministradorSalasComponent } from './profiles/Administrador/administrador-salas/administrador-salas.component';
import { FarmaciaPacienteComponent } from './profiles/Farmacia/farmacia-paciente/farmacia-paciente.component';
import { AdministradorEnfermeroComponent } from './profiles/Administrador/administrador-enfermero/administrador-enfermero.component';
import { EnfermeroHomeComponent } from './profiles/Enfermero/enfermero-home/enfermero-home.component';
import { EnfermeroInicioComponent } from './profiles/Enfermero/enfermero-inicio/enfermero-inicio.component';
import { EnfermeroEquipoComponent } from './profiles/Enfermero/enfermero-equipo/enfermero-equipo.component';
import {DoctorSalasComponent} from './profiles/Doctor/doctor-salas/doctor-salas.component';
import { SecretariaPagoComponent } from './profiles/Secretaria/secretaria-pago/secretaria-pago.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UserComponent,
    HomeComponent,
    CardsComponent,
    ShortNamePipe,
    ConcatenarPipe,
    SearchPipe,
    AdministradorHomeComponent,
    DoctorHomeComponent,
    PacienteHomeComponent,
    SecretariaHomeComponent,
    AdministradorDoctorComponent,
    AdministradorSecretarioComponent,
    DoctorHistorialComponent,
    DoctorPacientesComponent,
    DoctorAgendaComponent,
    PacienteAgendaComponent,
    SecretarioAgendaComponent,
    PacienteInicioComponent,
    DoctorInicioComponent,
    SecretarioInicioComponent,
    HistorialComponent,
    FarmaciaHomeComponent,
    FarmaciaTablaComponent,
    AdministradorSalasComponent,
    FarmaciaPacienteComponent,
    AdministradorEnfermeroComponent,
    EnfermeroHomeComponent,
    EnfermeroInicioComponent,
    EnfermeroEquipoComponent,
    DoctorSalasComponent,
    SecretariaPagoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
