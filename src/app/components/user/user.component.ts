import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Doctor } from '../../models/doctor.model';
import { Paciente } from '../../models/paciente.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id: string;
  isDoctor: boolean;
  datos: any;

  constructor( private activatedRouter: ActivatedRoute,
               public dataServie: DataService,
               private router: Router) {

    this.isDoctor = false;

    this.activatedRouter.params.subscribe( (params) => {
      this.id = params.id;
      console.log(this.id);
    });

    this.datos = dataServie.getUser(this.id);


    if (this.datos === undefined) {
      this.router.navigateByUrl('/home');
    }

    console.log(this.datos);

    const idSplit = this.id.split('_', 1);

    if (idSplit[0] === 'D' ){
      this.isDoctor = true;
    }

  }

  ngOnInit(): void {
  }

}
