import {Component, Input, OnInit} from '@angular/core';
import {LoginUser} from "../../model/post-request/login-user.model";
import {TokenResponse} from "../../model/response/token-response";
import {Message} from "../../model/message/message.model";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {MessageService} from "../../service/message.service";
import {LoginStatus} from "../../status/login-status";
import {Error} from "../../model/message/error.model";
import {Success} from "../../model/message/success.model";

@Component({
  selector: 'login-navbar',
  templateUrl: './login-navbar.component.html',
  styleUrls: ['./login-navbar.component.css']
})
export class LoginNavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private service: LoginService,
    private messages: MessageService) { }

  ngOnInit() {
  }

  @Input()
  public user: LoginUser;

  @Input()
  public status: LoginStatus;

  public attemptLogin(): void {
    if (!this.status.isPossible()){
      this.suspend();
      return;
    }
    this.service.attemptLogin(this.user).subscribe(
      (response: TokenResponse) => this.handleLoginResponse(
        response.token, this.user.credential)
    );
  }

  public suspend(): void {
    this.status.setSuspended(true);
    this.messages.add(new Error("Error", "Invalid login data"));
    setTimeout(()=>{
      this.status.setSuspended(false);
    }, 5000);
  }

  private handleLoginResponse(token: string, credential: string){
    if (token) {
      this.handleSuccessfulLogin(token, credential)
    } else {
      this.handleLoginError();
    }
  }

  private handleSuccessfulLogin(token: string, credential: string): void {
    if (token != null) {
      localStorage.setItem('auth-token', token);
      sessionStorage.setItem('credential', credential);
      this.messages.add(new Success("Successful login", "Welcome"));
      this.router.navigate(['']);
    }
  }

  private handleLoginError(){
    this.messages.add(new Error("Invalid credentials", "Try again"));
  }

  public openReset(): void {
    this.status.setResetActive(true);
  }

}
