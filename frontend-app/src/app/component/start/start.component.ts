import { Component, OnInit } from '@angular/core';
import {SignupUser} from '../../model/post-request/signup-user.model';
import {LoginUser} from '../../model/post-request/login-user.model';
import {SignupStatus} from "../../status/signup-status";
import {LoginStatus} from "../../status/login-status";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  public signupUser: SignupUser;
  public loginUser: LoginUser;

  constructor(
    protected signupStatus: SignupStatus,
    protected loginStatus: LoginStatus) {
    this.loginUser = new LoginUser();
    this.signupUser = new SignupUser();
    this.signupStatus.setUser(this.signupUser);
    this.loginStatus.setUser(this.loginUser);
  }

  ngOnInit() {
  }
}
