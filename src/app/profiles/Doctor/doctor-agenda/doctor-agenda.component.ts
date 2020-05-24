import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Agenda} from '../../../models/agenda.model';
import {DataService} from '../../../services/data.service';
import {Paciente} from '../../../models/paciente.model';
import {Doctor} from '../../../models/doctor.model';
import {Secretario} from '../../../models/secretario.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-doctor-agenda',
  templateUrl: './doctor-agenda.component.html',
  styleUrls: ['./doctor-agenda.component.css']
})
export class DoctorAgendaComponent implements OnInit {

  formEvento: FormGroup;
  formCita: FormGroup;
  doctor: Doctor;

  agregarCita = false;
  agregarEvento = false;

  citaInvalida = false;
  usuarioInvalido = false;
  horarioInvalid = false;

  editarEvento = false;
  index: number;



  constructor( private formBuilder: FormBuilder,
               public user: UserService,
               private data: DataService,
               private activatedRoute: ActivatedRoute) {
    this.createForm();
    this.doctor = this.user.user;
    if (this.user.user instanceof Secretario){
      this.activatedRoute.params.subscribe((param) => {
        this.doctor = this.data.getUser(param.id);
        console.log(this.doctor);
      });
    }
  }

  ngOnInit(): void {
  }

  reset(){
    this.agregarCita = false;
    this.agregarEvento = false;

    this.citaInvalida = false;
    this.usuarioInvalido = false;
    this.horarioInvalid = false;

    this.editarEvento = false;
    this.createForm();
  }

  posicion( i: number){
    this.index = i;
  }

  agendarCita(){

    const datos = this.formCita.value;
    let valido = true;

    console.log(datos);

    if (!this.formCita.valid){
      this.citaInvalida = !this.citaInvalida;
      setTimeout(() => {
        this.citaInvalida = !this.citaInvalida;
      }, 4000);
      return 0;
    }

    const tiempo = datos.duracion.split(':');

    // tslint:disable-next-line:radix
    const dateCompare1 = new Date( datos.ano, parseInt(datos.mes) - 1 , datos.dia, datos.hora, datos.minutos, 0, 0 );
    // tslint:disable-next-line:max-line-length radix
    const dateCompare2 = new Date( datos.ano, parseInt(datos.mes) - 1, datos.dia, parseInt(datos.hora) + parseInt(tiempo[0]), parseInt(datos.minutos) + parseInt(tiempo[1]), 0, 0 );

    this.doctor.citas.forEach( (cita) => {
      const date1 = cita.date;
      const date2 = cita.duracion;

      if (date1 <= dateCompare1 && date2 >= dateCompare1) {
        valido = false;
      }

      if (date1 >= dateCompare2 && date2 <= dateCompare1) {
        valido = false;
      }
    });

    if (!valido) {
      this.horarioInvalid = !this.horarioInvalid;
      setTimeout(() => {
        this.horarioInvalid = !this.horarioInvalid;
      }, 4000);
      return 0;
    }

    else {

      const paciente = this.data.getUser(datos.idEmail);

      if (paciente instanceof Paciente){
        const agenda = new Agenda('Cita', `${this.doctor.name} - ${paciente.name}`, dateCompare1, dateCompare2);
        agenda.paciente = paciente.id;
        console.log(agenda);

        this.doctor.citas.push(agenda);
        paciente.citas.push(agenda);

        console.log(this.doctor);
        console.log(paciente);
        this.reset();
      } else {
        this.usuarioInvalido = !this.usuarioInvalido;
        setTimeout(() => {
          this.usuarioInvalido = !this.usuarioInvalido;
        }, 4000);
      }

    }
  }

  agendar(){

    const datos = this.formEvento.value;
    let valido = true;

    console.log(datos);

    if (!this.formEvento.valid){
      this.citaInvalida = !this.citaInvalida;
      setTimeout(() => {
        this.citaInvalida = !this.citaInvalida;
      }, 4000);

      return 0;
    }

    const tiempo = datos.duracion.split(':');

    // tslint:disable-next-line:radix
    const dateCompare1 = new Date( datos.ano, parseInt(datos.mes) - 1, datos.dia, datos.hora, datos.minutos, 0, 0 );
    // tslint:disable-next-line:max-line-length radix
    const dateCompare2 = new Date( datos.ano, parseInt(datos.mes) - 1, datos.dia, parseInt(datos.hora) + parseInt(tiempo[0]), parseInt(datos.minutos) + parseInt(tiempo[1]), 0, 0 );

    this.doctor.citas.forEach( (cita) => {
      const date1 = cita.date;
      const date2 = cita.duracion;

      if (date1 <= dateCompare1 && date2 >= dateCompare1) {
        valido = false;
      }

      if (date1 >= dateCompare2 && date2 <= dateCompare1) {
        valido = false;
      }
    });

    if (!valido) {
      this.horarioInvalid = !this.horarioInvalid;
      setTimeout(() => {
        this.horarioInvalid = !this.horarioInvalid;
      }, 4000);
      return 0;
    }

    else {

      const agenda = new Agenda(datos.titulo, datos.descripcion,
        dateCompare1,
        // tslint:disable-next-line:radix max-line-length
        dateCompare2);

      console.log(agenda);
      this.doctor.citas.push(agenda);
      console.log(this.doctor);

      this.reset();
    }
  }

  actualizar(){
    const datos = this.formEvento.value;
    let valido = true;

    console.log(datos);

    if (!this.formEvento.valid){
      this.citaInvalida = !this.citaInvalida;
      setTimeout(() => {
        this.citaInvalida = !this.citaInvalida;
      }, 4000);
      return 0;
    } else {
      this.doctor.citas.splice(this.index, 1);
    }
  }

  concluir(i: number){
    const cita = this.doctor.citas[i];

    if (cita.titulo === 'Cita'){

      const pacientegenda = this.data.getUser(cita.paciente);
      pacientegenda.citas.splice(pacientegenda.citas.indexOf(this.doctor.citas[i]), 1);
      this.doctor.citas.splice(this.index, 1);
    }

    console.log(this.doctor.citas);
  }

  // Form Cita
  get idValido(){
    const dato = 'idEmail';
    return this.formCita.get(dato).invalid && this.formCita.get(dato).touched;
  }

  get descValido2(){
    const dato = 'descripcion';
    return this.formCita.get(dato).invalid && this.formCita.get(dato).touched;
  }

  get diaValido2(){
    const dato = 'dia';
    return this.formCita.get(dato).invalid && this.formCita.get(dato).touched;
  }

  get mesValido2(){
    const dato = 'mes';
    return this.formCita.get(dato).invalid && this.formCita.get(dato).touched;
  }

  get anoValido2(){
    const dato = 'ano';
    return this.formCita.get(dato).invalid && this.formCita.get(dato).touched;
  }

  get horaValido2(){
    const dato = 'hora';
    return this.formCita.get(dato).invalid && this.formCita.get(dato).touched;
  }

  get minutoValido2(){
    const dato = 'hora';
    return this.formCita.get(dato).invalid && this.formCita.get(dato).touched;
  }

  get duracionValido2(){
    const dato = 'duracion';
    return this.formCita.get(dato).invalid && this.formCita.get(dato).touched;
  }

  // Form Evento
  get tituloValido(){
    const dato = 'titulo';
    return this.formEvento.get(dato).invalid && this.formEvento.get(dato).touched;
  }

  get descValido(){
    const dato = 'descripcion';
    return this.formEvento.get(dato).invalid && this.formEvento.get(dato).touched;
  }

  get diaValido(){
    const dato = 'dia';
    return this.formEvento.get(dato).invalid && this.formEvento.get(dato).touched;
  }

  get mesValido(){
    const dato = 'mes';
    return this.formEvento.get(dato).invalid && this.formEvento.get(dato).touched;
  }

  get anoValido(){
    const dato = 'ano';
    return this.formEvento.get(dato).invalid && this.formEvento.get(dato).touched;
  }

  get horaValido(){
    const dato = 'hora';
    return this.formEvento.get(dato).invalid && this.formEvento.get(dato).touched;
  }

  get minutoValido(){
    const dato = 'hora';
    return this.formEvento.get(dato).invalid && this.formEvento.get(dato).touched;
  }

  get duracionValido(){
    const dato = 'duracion';
    return this.formEvento.get(dato).invalid && this.formEvento.get(dato).touched;
  }

  createForm(){
    this.formEvento = this.formBuilder.group({
      titulo: ['', Validators.required],
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      ano: ['', Validators.required],
      hora: ['', Validators.required],
      minutos: ['', Validators.required],
      duracion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.formCita = this.formBuilder.group({
      idEmail: ['', Validators.required],
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      ano: ['', Validators.required],
      hora: ['', Validators.required],
      minutos: ['', Validators.required],
      duracion: ['', Validators.required]
    });
  }

  editForm( titulo: string, dia: string, mes: string, ano: string, hora: string, duracion: string, description: string ){
    this.formEvento = this.formBuilder.group({
      titulo: ['', Validators.required],
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      ano: ['', Validators.required],
      hora: ['', Validators.required],
      minutos: ['', Validators.required],
      duracion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
}
