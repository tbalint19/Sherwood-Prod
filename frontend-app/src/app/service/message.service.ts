import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Message} from "../model/message/message.model";


@Injectable()
export class MessageService {

  public messages: Message[] = [];

  constructor(private router: Router) {
  }

  public add(message: Message): void {
    this.messages.push(message);
  }

  public getRelevant(): Message[] {
    return this.messages.filter((entry: Message) => entry.isRelevant);
  }

}
