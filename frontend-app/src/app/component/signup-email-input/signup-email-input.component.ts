import {Component, Input, OnInit} from '@angular/core';
import {SignupUser} from "../../model/post-request/signup-user.model";
import {SignupStatus} from "../../status/signup-status";
import {CheckEmailParams} from "../../model/get-request/check-email-params.model";
import {CheckResponse} from "../../model/response/check-response.model";
import {SignupService} from "../../service/signup.service";

@Component({
  selector: 'signup-email-input',
  templateUrl: './signup-email-input.component.html',
  styleUrls: ['./signup-email-input.component.css']
})
export class SignupEmailInputComponent implements OnInit {

  constructor(private service: SignupService) { }

  ngOnInit() {
  }

  @Input()
  public user: SignupUser;

  @Input()
  public status: SignupStatus;

  protected checkEmail(): void {
    if (!this.status.emailIsValid()){ return; }
    this.service.checkEmail(new CheckEmailParams(this.user.email))
      .subscribe((response: CheckResponse) => this.handleResponse(response));
  }

  public handleResponse(response: CheckResponse): void {
    this.status.setEmailAvailability(response.available);
  }

}
