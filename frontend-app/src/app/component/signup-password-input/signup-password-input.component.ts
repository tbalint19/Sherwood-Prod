import {Component, Input, OnInit} from '@angular/core';
import {SignupUser} from "../../model/post-request/signup-user.model";
import {SignupStatus} from "../../status/signup-status";

@Component({
  selector: 'signup-password-input',
  templateUrl: './signup-password-input.component.html',
  styleUrls: ['./signup-password-input.component.css']
})
export class SignupPasswordInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  public user: SignupUser;

  @Input()
  public status: SignupStatus;

}
