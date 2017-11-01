export class Reset {

  username: string;

  code: string;

  password: string;

  passwordAgain: string;

  initialize(){
    this.username = "";
    this.code = "";
    this.password = "";
    this.passwordAgain = "";
  }

  constructor(){
    this.initialize();
  }

  reset(){
    this.initialize();
  }

}
