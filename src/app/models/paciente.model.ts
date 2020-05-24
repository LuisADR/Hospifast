import { Phone } from './phone.model';
import {Agenda} from './agenda.model';


export class Paciente {
    id: string;
    email: string;
    password: string;
    name: string;
    phones: Phone[];
    historialID: string[];
    citas: Agenda[];
    birthday: string;
    sex: string;
    status: string;

    constructor(id: string, name: string, phone: Phone[], birthday: string, sex: string, status: string, mail: string){
        this.id = id;
        this.email = mail;
        this.name = name;
        this.phones = phone;
        this.birthday = birthday;
        this.sex = sex;
        this.status = status;
        this.password = id;
        this.historialID = [];
        this.citas = [];
    }
}
