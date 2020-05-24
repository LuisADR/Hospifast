import {Phone} from './phone.model';

export class EnfermeroModel {
  id: string;
  email: string;
  password: string;
  name: string;
  phones: Phone[];
  birthday: string;
  doctorid: string[];
  constructor(mail: string, password: string, name: string, birthday: string, id: string, phones: Phone[]){
    this.id = id;
    this.email = mail;
    this.password = password;
    this.name = name;
    this.birthday = birthday;
    this.phones = phones;
  }
}
