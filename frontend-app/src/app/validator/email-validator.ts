import {Injectable} from "@angular/core";

@Injectable()
export class EmailValidator {

  private emailPattern: RegExp;

  constructor(){
    this.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  public validFormat(email: string): boolean {
    return email.match(this.emailPattern) != null;
  }
}
