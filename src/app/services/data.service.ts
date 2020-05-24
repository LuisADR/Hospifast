import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente.model';
import { Doctor } from '../models/doctor.model';
import { Phone } from '../models/phone.model';
import {Administrador} from '../models/administrador.model';
import {Secretario} from '../models/secretario.model';
import {Historial} from '../models/historial.model';
import {FarmaciaModel} from '../models/farmacia.model';
import {SalaModel} from '../models/sala.model';
import {MedicamentoModel} from '../models/medicamento.model';
import {EnfermeroModel} from '../models/enfermero.model';
import {EquipoModel} from '../models/equipo.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  pacientes: Paciente[] = [];
  doctores: Doctor[] = [];
  secretarios: Secretario[] = [];
  enfermero: EnfermeroModel[] = [];
  casosActivos: Historial[] = [];
  casosArchivados: Historial[] = [];
  administradores: Administrador;
  farmacia: FarmaciaModel[] = [];
  salas: SalaModel [] = [];
  equipoOcupado: EquipoModel[] = [];
  equipoDisponible: EquipoModel[] = [];

  lastIdDoctore = 0;
  lastIdPaciente = 0;
  lastIdSecretario = 0;
  lastIdEnfermero = 0;
  lastIdHistorial = 0;
  lastIdEquipo = 0;

  constructor() {

    console.log('Iniciando Servicio ....');

    // Pacientes
    this.createPaciente('Ana paola', 'Mujer', '24/04/1987',
      [new Phone('Casa', '7226659284')], 'anapaola@gmail.com');

    this.createPaciente('Marha', 'Mujer', '14/09/1997',
      [new Phone('Casa', '7226615483'), new Phone('Celular', '7223156988')], 'martha@gmail.com');

    // Doctores
    this.createDoctor('Victor Eduardo', ['Medico General'], '30/01/1986',
                      [ new Phone('Casa', '4512384'), new Phone('Celular', '7221452236')], 'victoreduardo@gmail.com');

    // Secretarios
    this.createSecretario( 'Veronica', '16/06/1989', 'veronica@gmail.com', [new Phone('Casa', '2147562')], ['D_0'], 'veronica');

    // Historial
    this.createHistorial( 'D_0', 'P_0');
    this.casosActivos[0].tratamiento = '1 pastillas de Ibuprufeno 500g cada 12hrs por 3 dias';

    // Enfermero
    this.createEnfermero('Victor Eduardo Sanchez', '24/04/2000', 'vicEduardo@gmail.com', [new Phone('Celular', '7221452236')], '1234');

    // Administrador
    this.administradores = new Administrador('admin', 'admin');

    // Farmacia
    this.createFarmacia( 'F_0', 'F_0');
    this.farmacia[0].medicamento.push( new MedicamentoModel());
    this.farmacia[0].medicamento[0].id = 'M_1';
    this.farmacia[0].medicamento[0].nombre = 'Ibuprufeno';
    this.farmacia[0].medicamento[0].envase = 12;
    this.farmacia[0].medicamento[0].presentacion = '500g';
    this.farmacia[0].medicamento[0].disponibilidad = 15;
    this.farmacia[0].medicamento[0].precio = 150;

    // Salas
    this.crearSala( 'S_0', 'Edificio 1', 'Consultorio');

    // Equipo Medico
    this.createEquipo('Silla de ruedes', 'Sala de espera');
    this.createEquipo('Silla de ruedes', 'Recepcion');
    this.createEquipo('Silla de ruedes', 'Urgencias');
    this.changeOcupado(this.equipoDisponible[2]);

    console.log(this.secretarios);
    console.log(this.doctores);
    console.log(this.pacientes);
    console.log(this.administradores);

  }

  // Crear Doctor
  createDoctor(name: string, specialities: string[], birthday: string, phones: Phone[], email: string, password?: string){
    const doc = new Doctor(name, specialities, birthday, phones, `D_${this.lastIdDoctore}`, email);

    doc.password = `D_${this.lastIdDoctore}`;

    if (password) {
      doc.password = password;
    }

    if (!this.isEmailUsed(email)){
      this.doctores.push(doc);
      this.lastIdDoctore ++;
      return doc.id;
    }

    return 'emailUsed';
  }

  // Crear Paciente
  createPaciente(name: string, sex: string, birthday: string, phones: Phone[], email: string, password?: string){
    const pac = new Paciente(`P_${this.lastIdPaciente}`, name, phones, birthday, sex, 'Ninguno', email);
    pac.password = `P_${this.lastIdPaciente}`;

    if (password) {
      pac.password = password;
    }

    if (!this.isEmailUsed(email)){
      this.pacientes.push(pac);
      this.lastIdPaciente ++;
      return pac.id;
    }

    return 'emailUsed';
  }

  // Crear secretario
  createSecretario(name: string, birthay: string, email: string, phones: Phone[], doctor: string[], password?: string){
    const sec = new Secretario( email, `S_${this.lastIdSecretario}`, name, birthay, `S_${this.lastIdSecretario}`, phones);
    sec.doctorid = doctor;
    if (password) {
      sec.password = password;
    }

    if (!this.isEmailUsed(email)){
      this.secretarios.push(sec);
      this.lastIdSecretario ++;
      return sec.id;
    }

    return 'emailUsed';
  }

  // Crear Enfermero
  createEnfermero(name: string, birthay: string, email: string, phones: Phone[], password?: string){
    const sec = new EnfermeroModel( email, `E_${this.lastIdEnfermero}`, name, birthay, `E_${this.lastIdEnfermero}`, phones);
    if (password) {
      sec.password = password;
    }

    if (!this.isEmailUsed(email)){
      this.enfermero.push(sec);
      this.lastIdEnfermero ++;
      return sec.id;
    }

    return 'emailUsed';
  }

  // Crear Farmacia
  createFarmacia( id: string, password: string){
    const far = new FarmaciaModel( id, password);

    this.farmacia.push(far);
  }

  // Crear historial medico
  createHistorial( doctorId: string, pacienteId: string){
    const doctor = this.getUser(doctorId);
    const paciente = this.getUser(pacienteId);

    if (this.casosActivos.find((datos) => datos.pacienteId === paciente.id)){
      console.log('activo');
      return 'activo';
    }

    const historial = new Historial(`H_${this.lastIdHistorial}`, doctor, paciente, 'regular');

    doctor.casesID.push(`H_${this.lastIdHistorial}`);
    this.lastIdHistorial ++;

    this.casosActivos.push(historial);

    return historial.id;
  }

  // Crear Sala
  crearSala( id: string, ubicacion: string, especialidad: string){
    const sal = new SalaModel(id, ubicacion, especialidad);

    this.salas.push(sal);
  }

  // Crear equipo
  createEquipo( nombre: string, ubicacion: string ){
    const equi = new EquipoModel( `EM_${this.lastIdEquipo}`, nombre, ubicacion);

    this.lastIdEquipo ++;
    this.equipoDisponible.push(equi);
  }

  // Cambiar estado equipo
  changeOcupado( equipo: EquipoModel){

    this.equipoOcupado.push(equipo);

    this.equipoDisponible.splice(this.equipoDisponible.indexOf(equipo), 1);
  }

  changeDisponible( equipo: EquipoModel){

    this.equipoDisponible.push(equipo);

    this.equipoOcupado.splice(this.equipoOcupado.indexOf(equipo), 1);
  }

  // Obtener un equipo
  getEquipo( id: string ){
    let equi = this.equipoDisponible.forEach(datos => id === datos.id);
    if (equi != null){
      return equi;
    }

    equi = this.equipoOcupado.forEach(datos => id === datos.id);

    return equi;
  }

  // Obtener un usuario
  getUser( idEmail: string){
    const splitId = idEmail.split('_');
    let user = null;

    if ( splitId[0] === 'D') {
      return this.doctores.find((datos) => datos.id === idEmail);
    }
    if ( splitId[0] === 'P') {
      return this.pacientes.find((datos) => datos.id === idEmail);
    }
    if ( splitId[0] === 'F') {
      return this.farmacia.find((datos) => datos.id === idEmail);
    }
    if ( splitId[0] === 'E') {
      return this.enfermero.find((datos) => datos.id === idEmail);
    }
    if ( splitId[0] === 'S') {
      return this.secretarios.find((datos) => datos.id === idEmail);
    } else {

      this.doctores.find((datos) => {
        if (idEmail === datos.email) {
          user = datos;
        }
      });

      if (user !== null) { return user; }

      this.pacientes.find((datos) => {
        if (idEmail === datos.email) {
          user = datos;
        }
      });

      if (user !== null) { return user; }

      this.enfermero.find((datos) => {
        if (idEmail === datos.email) {
          user = datos;
        }
      });

      if (user !== null) { return user; }

      this.secretarios.find((datos) => {
        if (idEmail === datos.email) {
          user = datos;
        }
      });

      if (idEmail === 'admin'){
        return this.administradores;
      }

      return user;
    }
  }

  // Obtener Historial
  getHistorialActual( id: string){
    return this.casosActivos.find((datos) => datos.id === id);
  }

  // Obtener historial archivos
  getHistorialArchivados( id: string){
    return this.casosArchivados.find((datos) => datos.id === id);
  }

  // Obtener sala
  getSala( id: string ){
    return this.salas.find((datos) => datos.id === id);
  }

  // Obtener Historial
  archivarHistorial( historia: Historial){

    historia.edit = false;
    this.casosArchivados.push(historia);
    this.pacientes.find((datos) => datos.id === historia.pacienteId).historialID.push(historia.id);

    this.casosActivos.splice(this.casosActivos.indexOf(historia), 1);
  }

  // Chear si unemail ya es usado
  isEmailUsed(email: string){
    if ( this.doctores.find((user) => user.email === email)){
      console.log('Doctor');
      return true;
    }

    if ( this.pacientes.find((user) => user.email === email)){
      console.log('Paciente');
      return true;
    }

    if ( this.secretarios.find((user) => user.email === email)){
      console.log('Secretario');
      return true;
    }

    console.log('Falso');
    return false;
  }

  // Ver si una sala es disponible

  isAvaliable( id: string){
    return this.salas.find((datos) => {

      if ( datos.id === id){
        if (datos.estado === 'Disponible'){
          return true;
        } else {
          return false;
        }
      }
    });
  }
}
