import {Injectable} from "@angular/core";

@Injectable()
export class PasswordValidator {
  
  private passwordPattern: RegExp;
  
  constructor(){
    this.passwordPattern = /^([a-zA-Z0-9_-]){10,25}$/;
  }

  public validFormat(password: string): boolean {
    return password.match(this.passwordPattern) != null;
  }
}
