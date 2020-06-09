export class CardInfo{
  header: string;
  id: string;
  uno: string;
  dos: string;
  small: string;

  succes: boolean;
  warning: boolean;
  primary: boolean;
  button: boolean;

  constructor(header: string, id: string, text1: string, text2: string, small: string){
    this.header = header;
    this.id = id;
    this.uno = text1;
    this.dos = text2;
    this.small = small;

    this.succes = false;
    this.warning = false;
    this.primary = false;
    this.button = false;
  }
}
