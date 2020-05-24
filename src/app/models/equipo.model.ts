export class EquipoModel{
  id: string;
  nombre: string;
  ubicacion: string;
  encargado: string;

  constructor(id: string, nombre: string, ubicacion: string) {
    this.id = id;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
  }
}
