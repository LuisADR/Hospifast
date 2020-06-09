import {Doctor} from './doctor.model';
import {Paciente} from './paciente.model';
import {MedicamentoModel} from './medicamento.model';

export class Historial {
  id: string;
  edit: boolean;

  doctorId: string;
  doctorNombre: string;
  doctorEspecialidad: string[];
  medicamentosSurtidos: MedicamentoModel[];
  medicamentosSurtidosP: MedicamentoModel[];

  pacienteNombre: string;
  pacienteId: string;
  pacienteSexo: string;
  pacienteEstado: string;

  sintomas: string;
  diagnostico: string;
  tratamiento: string;

  pago: boolean;
  pagoConsulta: boolean;

  constructor( id: string, doctor: Doctor, paciente: Paciente, estado: string){
    this.id = id;
    this.edit = true;
    this.doctorId = doctor.id;
    this.doctorEspecialidad = doctor.specialties;
    this.doctorNombre = doctor.name;
    this.pacienteId = paciente.id;
    this.pacienteNombre = paciente.name;
    this.pacienteSexo = paciente.sex;
    this.pacienteEstado = estado;
    this.medicamentosSurtidos = [];
    this.medicamentosSurtidosP = [];
    this.pago = false;
    this.pagoConsulta = false;
  }
}
