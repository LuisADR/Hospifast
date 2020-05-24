import {MedicamentoModel} from './medicamento.model';

export class FarmaciaModel {
  id: string;
  password: string;
  medicamento: MedicamentoModel[];

  constructor(id: string, password: string) {
    this.id = id;
    this.password = password;
    this.medicamento = [];
  }
}
