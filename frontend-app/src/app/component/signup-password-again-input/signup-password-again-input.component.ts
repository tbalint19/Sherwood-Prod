import {Component, Input, OnInit} from '@angular/core';
import {SignupUser} from "../../model/post-request/signup-user.model";
import {SignupStatus} from "../../status/signup-status";

@Component({
  selector: 'signup-password-again-input',
  templateUrl: './signup-password-again-input.component.html',
  styleUrls: ['./signup-password-again-input.component.css']
})
export class SignupPasswordAgainInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  public user: SignupUser;

  @Input()
  public status: SignupStatus;

}
