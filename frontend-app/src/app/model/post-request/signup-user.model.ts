export class SignupUser {

  username: string;
  email: string;
  password: string;
  passwordAgain: string;

  initialize(){
    this.username = "";
    this.email = "";
    this.password = "";
    this.passwordAgain = "";
  }

  constructor(){
    this.initialize()
  }

  reset(){
    this.initialize()
  }
}
