import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {DataService} from '../../../services/data.service';
import {MedicamentoModel} from '../../../models/medicamento.model';
import {Historial} from '../../../models/historial.model';

@Component({
  selector: 'app-farmacia-tabla',
  templateUrl: './farmacia-tabla.component.html',
  styleUrls: ['./farmacia-tabla.component.css']
})
export class FarmaciaTablaComponent{

  agregarMedicamento: boolean;
  editarMedicamento: boolean;
  medicamentoRegistrado: boolean;
  campoInvalido: boolean;
  agotado = false;
  busqueda = false;
  updateMedicine = false;
  historialNotFound = false;

  historialUsuario: Historial;

  formMedicamento: FormGroup;
  formBusqueda: FormGroup;
  formUpdate: FormGroup;

  medicamentos: MedicamentoModel[];
  busquedaMedicamento: MedicamentoModel[] = [];
  cesta: MedicamentoModel[];


  constructor( private formBuilder: FormBuilder,
               public user: UserService,
               private data: DataService) {
    this.reset();
    this.medicamentos = this.user.user.medicamento;
    this.cesta = [];
  }

  reset(){
    this.agregarMedicamento = false;
    this.editarMedicamento = false;
    this.medicamentoRegistrado = false;
    this.campoInvalido = false;
    this.busqueda = false;
    this.updateMedicine = false;
    this.historialNotFound = false;
    this.medicamentos = this.user.user.medicamento;
    this.addForm();
  }

  buscarMedicamento(){
    this.busquedaMedicamento = [];
    const value = this.formBusqueda.value;
    this.user.user.medicamento.forEach( (data) => {
      if (data.id.search(value.id) !== -1 || data.nombre.search(value.id) !== -1 ){
        this.busquedaMedicamento.push(data);
      }
    });

    this.medicamentos = this.busquedaMedicamento;
  }

  buscarHistorial(){
    const id = this.formBusqueda.value.id;
    let historial = this.data.getHistorialActual(id);
    if (historial == null){
        historial = this.data.getHistorialArchivados(id);
        if (historial == null){
          this.historialNotFound = !this.historialNotFound;
          setTimeout(() => {
            this.historialNotFound = !this.historialNotFound;
          }, 4000);
          return 0;
        }
    }

    if (historial != null){
      this.historialUsuario = historial;
    }
  }
  addMedicamento(){
    const data = this.formMedicamento.value;

    if (!this.formMedicamento.valid){
      this.campoInvalido = !this.campoInvalido;
      setTimeout(() => {
        this.campoInvalido = !this.campoInvalido;
      }, 4000);
      return 0;
    } else {
      const med = new MedicamentoModel();
      med.id = data.id;
      med.nombre = data.nombre;
      med.envase = data.envase;
      med.presentacion = data.presentacion;
      med.precio = data.precio;
      med.disponibilidad = data.disponibilidad;

      if ( this.medicamentos.find( (datos) => {
        console.log(med.nombre + datos.nombre);
        if ( med.nombre === datos.nombre || med.id === datos.id){
          return false;
        }
        return true;
      }) || this.medicamentos.length === 0 ) {
        this.user.user.medicamento.push(med);

        this.reset();
      } else {
        this.medicamentoRegistrado = !this.medicamentoRegistrado;
        setTimeout(() => {
          this.medicamentoRegistrado = !this.medicamentoRegistrado;
        }, 4000);
        return 0;
      }
    }
  }

  compra(index: number){
    const med = this.medicamentos[index];

    if (med.disponibilidad-- >= 1){
      this.cesta.push(med);
      console.log(med);
    } else {
      this.agotado = !this.agotado;
      setTimeout(() => {
        this.agotado = !this.agotado;
      }, 4000);
      med.disponibilidad ++;
    }
  }

  terminarCompra(){
    this.cesta.forEach( datos => {
      this.historialUsuario.medicamentosSurtidos.push(datos);
      this.historialUsuario.pago = false;
    });

    this.cesta = [];
  }

  eliminar(index: number){
    this.medicamentos.splice(index, 1);
  }

  update(index: number){
    this.updateForm(this.medicamentos[index]);
    this.updateMedicine = true;
  }

  updateData(){
    const data = this.formUpdate.value;

    this.user.user.medicamento.forEach( (med) => {
      if (med.id === data.id){
        med.nombre = data.nombre;
        med.envase = data.envase;
        med.presentacion = data.presentacion;
        med.precio = data.precio;
        med.disponibilidad = data.disponibilidad;

        this.reset();
        return true;
      }
    });
  }

  eliminarCesta(index: number){
    this.cesta[index].disponibilidad++;
    this.cesta.splice(index, 1);
  }

  get idValido(){
    const dato = 'id';
    return this.formMedicamento.get(dato).invalid && this.formMedicamento.get(dato).touched;
  }

  get nombreValido(){
    const dato = 'nombre';
    return this.formMedicamento.get(dato).invalid && this.formMedicamento.get(dato).touched;
  }

  get envaseValido(){
    const dato = 'envase';
    return this.formMedicamento.get(dato).invalid && this.formMedicamento.get(dato).touched;
  }

  get presentacionValido(){
    const dato = 'presentacion';
    return this.formMedicamento.get(dato).invalid && this.formMedicamento.get(dato).touched;
  }

  get disponibilidad(){
    const dato = 'disponibilidad';
    return this.formMedicamento.get(dato).invalid && this.formMedicamento.get(dato).touched;
  }

  get precioValido(){
    const dato = 'precio';
    return this.formMedicamento.get(dato).invalid && this.formMedicamento.get(dato).touched;
  }

  addForm(){
    this.formMedicamento = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      envase: ['', Validators.required],
      presentacion: ['', Validators.required],
      disponibilidad: ['', Validators.required],
      precio: ['', Validators.required]
    });

    this.formBusqueda = this.formBuilder.group( {
      id: ['', Validators.required]
    });
  }

  updateForm( med: MedicamentoModel ){
    this.formUpdate = this.formBuilder.group({
      id: [med.id, Validators.required],
      nombre: [med.nombre, Validators.required],
      envase: [med.envase, Validators.required],
      presentacion: [med.presentacion, Validators.required],
      disponibilidad: [med.disponibilidad, Validators.required],
      precio: [med.precio, Validators.required]
    });
  }
}
