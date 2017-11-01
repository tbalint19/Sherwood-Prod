export class ConfirmEmailParams {

  credential: string;

  private initialize(){
    this.credential = "";
  }

  constructor(){
    this.initialize();
  }

  reset(){
    this.initialize();
  }

}
