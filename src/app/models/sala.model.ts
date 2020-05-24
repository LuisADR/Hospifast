export class SalaModel {
  id: string;
  ubicacion: string;
  especialidad: string;
  estado: string;

  constructor(id: string, ubicacion: string, especialidad: string) {

    this.id = id;
    this.ubicacion = ubicacion;
    this.especialidad = especialidad;
    this.estado = 'Disponible';
  }
}
