import {Component, OnInit} from '@angular/core';
import {Historial} from '../../models/historial.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  datos: Historial;

  formDiagnostico: FormGroup;
  formSintomas: FormGroup;
  formTratamiento: FormGroup;

  editarSinstomas = false;
  editarDiagnostico = false;
  editarTratamiento = false;

  constructor( private router: Router,
               private activateRouter: ActivatedRoute,
               private data: DataService,
               private formBuilder: FormBuilder,
               public user: UserService) {
    this.activateRouter.params.subscribe( (params) => {
      console.log(params.id);
      this.datos = this.data.getHistorialActual(params.id);
      if (this.datos === undefined){
        this.datos = this.data.getHistorialArchivados(params.id);
      }
      console.log(this.datos);
    });

    if (this.datos.edit) {
      this.createForm();
    }
  }

  ngOnInit(): void {
  }

  updateSintomas(){
    this.datos.sintomas = this.formSintomas.value.sintomas;
    console.log(this.datos);
    this.editarSinstomas = false;
  }

  updateDiagnostico(){
    this.datos.diagnostico = this.formDiagnostico.value.diagnostico;
    console.log(this.datos);
    this.editarDiagnostico = false;
  }

  updateTratamiento(){
    this.datos.tratamiento = this.formTratamiento.value.tratamiento;
    console.log(this.datos);
    this.editarTratamiento = false;
  }

  archivar(){
    const i = this.user.user.casesID.indexOf(this.datos.id);
    this.user.user.saveCasesID.push(this.datos.id);
    this.user.user.casesID.splice(i, 1);

    this.data.archivarHistorial( this.datos);
    this.router.navigateByUrl('/doctor/historial');
  }

  createForm(){
    this.formDiagnostico = this.formBuilder.group({
      diagnostico: [this.datos.diagnostico]
    });

    this.formSintomas = this.formBuilder.group({
      sintomas: [this.datos.sintomas]
    });

    this.formTratamiento = this.formBuilder.group({
      tratamiento: [this.datos.tratamiento]
    });
  }

}
