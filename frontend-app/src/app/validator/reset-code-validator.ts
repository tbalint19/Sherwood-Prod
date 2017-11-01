import {Injectable} from "@angular/core";

@Injectable()
export class ResetCodeValidator {

  private codePattern: RegExp;

  constructor(){
    this.codePattern = /^([a-zA-Z0-9_-]){20,30}$/;
  }

  public validFormat(code: string): boolean {
    return code.match(this.codePattern) != null;
  }
}
