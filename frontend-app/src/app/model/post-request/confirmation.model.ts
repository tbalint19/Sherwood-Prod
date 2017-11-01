export class Confirmation {

  credential: string;
  code: string;

  initialize(): void {
    this.credential = "";
    this.code = "";
  }

  constructor(){
    this.initialize()
  }

  reset(){
    this.initialize();
  }
}
