import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Reset} from "../../model/post-request/reset.model";
import {Location} from '@angular/common';
import {ResetService} from "../../service/reset.service";
import {SuccessResponse} from "../../model/response/success-response.model";
import {MessageService} from "../../service/message.service";
import {Message} from "../../model/message/message.model";
import {ResetStatus} from "../../status/reset-status";
import {Error} from "../../model/message/error.model";
import {Success} from "../../model/message/success.model";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  public reset: Reset;

  constructor(
    private resetService: ResetService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messages: MessageService,
    protected status: ResetStatus,
    private location: Location) {
    this.reset = new Reset();
    this.status.setReset(this.reset);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        if (params['code'] && params['user']) {
          this.initResetFromParams(params);
        } else {
          this.router.navigate(['']);
        }
      }
    );
  }

  public attemptReset(): void {
    if (!this.status.isPossible()) {
      this.suspend();
      return;
    }
    this.resetService.attemptReset(this.reset).subscribe(
      (response: SuccessResponse) => this.handleResetResponse(response.successful)
    )
  }

  private suspend(): void {
    this.messages.add(new Error("Error", "Unsuccessful password reset attempt"));
    this.status.setSuspended(true);
    setTimeout(()=>{
      this.status.setSuspended(false);
    }, 5000)
  }

  private initResetFromParams(params: Params): void {
    this.reset.username = params['user'];
    this.reset.code = params['code'];
    this.location.replaceState("reset");
  }

  private handleResetResponse(successful: boolean): void {
    if (successful) {
      this.handleSuccess();
    } else {
      this.handleError();
    }
  }

  private handleSuccess(): void {
    this.messages.add(new Success("Successful reset", "You can log in now with your new password"));
    this.router.navigate(['start']);
  }

  private handleError(): void {
    this.messages.add(new Error("Error", "Unsuccessful password reset attempt"));
  }

}
