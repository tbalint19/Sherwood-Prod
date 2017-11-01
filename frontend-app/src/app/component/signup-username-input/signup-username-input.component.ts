import {Component, Input, OnInit} from '@angular/core';
import {SignupStatus} from "../../status/signup-status";
import {CheckUsernameParams} from "../../model/get-request/check-username-params.model";
import {CheckResponse} from "../../model/response/check-response.model";
import {SignupService} from "../../service/signup.service";
import {SignupUser} from "../../model/post-request/signup-user.model";

@Component({
  selector: 'signup-username-input',
  templateUrl: './signup-username-input.component.html',
  styleUrls: ['./signup-username-input.component.css']
})
export class SignupUsernameInputComponent implements OnInit {

  constructor(private service: SignupService) { }

  ngOnInit() {
  }

  @Input()
  public status: SignupStatus;

  @Input()
  public user: SignupUser;

  protected checkUsername(): void {
    if (!this.status.usernameIsValid()){ return; }
    this.service.checkUsername(new CheckUsernameParams(this.user.username))
      .subscribe((response: CheckResponse) => this.handleResponse(response));
  }

  private handleResponse(response: CheckResponse): void {
    this.status.setUsernameAvailability(response.available);
  }

}
