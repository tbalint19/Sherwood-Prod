export class LoginUser {

  credential: string;
  password: string;

  initialize(){
    this.credential = "";
    this.password = "";
  }

  constructor(){
    this.initialize()
  }

  reset(){
    this.initialize()
  }
}
