import { Phone } from './phone.model';
import {Agenda} from './agenda.model';
import {SalaModel} from './sala.model';

export class Doctor {
    id: string;
    email: string;
    password: string;
    name: string;
    birthday: string;
    specialties: string[];
    casesID: string[];
    saveCasesID: string[];
    shareCasesID: string[];
    phones: Phone[];
    citas: Agenda[];
    constructor(name: string, specialitie: string[], birthday: string, phones: Phone[], id: string, mail: string) {
        this.id = id;
        this.email = mail;
        this.name = name;
        this.specialties = specialitie;
        this.birthday = birthday;
        this.phones = phones;
        this.password = id;
        this.casesID = [];
        this.saveCasesID = [];
        this.citas = [];
        this.shareCasesID = [];
    }
}
