import {Injectable} from "@angular/core";

@Injectable()
export class CredentialValidator {

  private usernamePattern: RegExp;
  private emailPattern: RegExp;

  constructor(){
    this.usernamePattern = /^([a-zA-Z0-9_-]){10,25}$/;
    this.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  public validFormat(credential: string): boolean {
    let pattern = credential.includes("@") ? this.emailPattern : this.usernamePattern;
    return credential.match(pattern) != null;
  }
}
