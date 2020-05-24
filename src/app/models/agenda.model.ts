export class Agenda {
  titulo: string;
  descripcion: string;
  date: Date;
  duracion: Date;
  paciente: string;
  constructor(titulo: string, descripcion: string, date: Date, duracion: Date){
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.date = date;
    this.duracion = duracion;
  }
}
