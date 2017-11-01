import {Component, Input, OnInit} from '@angular/core';
import {SignupUser} from "../../model/post-request/signup-user.model";
import {SignupStatus} from "../../status/signup-status";
import {SuccessResponse} from "../../model/response/success-response.model";
import {SignupService} from "../../service/signup.service";
import {Message} from "../../model/message/message.model";
import {MessageService} from "../../service/message.service";
import {Error} from "../../model/message/error.model";
import {Success} from "../../model/message/success.model";

@Component({
  selector: 'signup-button',
  templateUrl: './signup-button.component.html',
  styleUrls: ['./signup-button.component.css']
})
export class SignupButtonComponent implements OnInit {

  constructor(private service: SignupService, public messages: MessageService) { }

  ngOnInit() {
  }

  @Input()
  public user: SignupUser;

  @Input()
  public status: SignupStatus;

  public attemptSignup(): void {
    if (!this.status.isPossible()) {
      this.suspend();
      return;
    }
    this.service.attemptSignup(this.user).subscribe(
      (response: SuccessResponse) => this.handleSignupResponse(response.successful)
    );
  }

  private suspend(): void {
    this.status.setSuspended(true);
    this.messages.add(new Error("Error", "Invalid signup data"));
    setTimeout(()=>{
      this.status.setSuspended(false);
    }, 5000);
  }

  private handleSignupResponse(successful: boolean): void {
    if (successful) {
      this.messages.add(new Success("Successful signup", "You can log in now"));
      this.user.reset();
    } else {
      this.messages.add(new Error("Ooops!", "Something went wrong"));
    }
  }

}
